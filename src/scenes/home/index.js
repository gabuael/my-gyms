import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import escapeRegExp from 'escape-string-regexp';

import api from '../../services/api';
import { Container, ListaAcademias, Pesquisa, Input, ButtonX } from './styles';
import CardAcademia from '../../components/CardAcademia';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {
  state = {
    gyms: [],
    scroll: true,
    horizontal: true,
    gymsSelect: [],
    search: '',
  };

  componentDidMount() {
    this.findGyms();
  }

  handleScroll = scroll => {
    this.setState({ scroll });
  };

  handleListOrientatio = horizontal => {
    const { gyms } = this.state;
    if (horizontal) {
      Keyboard.dismiss();
      this.setState({ horizontal, gymsSelect: gyms, search: '' });
    } else {
      this.setState({ horizontal });
    }
  };

  findGyms = async () => {
    const response = await api.get('gyms');

    this.setState({ gyms: response.data, gymsSelect: response.data });
  };

  handleSearch = search => {
    const { gyms } = this.state;
    const match = new RegExp(escapeRegExp(search), 'i');

    const gymsSelect = gyms.filter(_ => match.test(_.title));

    this.setState({ gymsSelect, search });
  };

  render() {
    const { gymsSelect, scroll, horizontal, search } = this.state;
    return (
      <Container>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ width, height }}
        />
        <Pesquisa>
          <Icon name="search" size={20} color="#0094FF" />
          <Input
            onFocus={() => this.handleListOrientatio(false)}
            onChangeText={this.handleSearch}
            value={search}
          />
          {!horizontal && (
            <ButtonX onPress={() => this.handleListOrientatio(true)}>
              <Icon name="x" size={20} color="#0094FF" />
            </ButtonX>
          )}
        </Pesquisa>
        <ListaAcademias
          testID="scroll"
          data={gymsSelect}
          keyExtractor={gym => String(gym.id)}
          renderItem={({ item }) => (
            <CardAcademia {...item} handleScroll={this.handleScroll} />
          )}
          horizontal={horizontal}
          snapToInterval={width * 0.976}
          decelerationRate="fast"
          snapToAlignment="center"
          scrollEnabled={scroll}
        />
      </Container>
    );
  }
}
