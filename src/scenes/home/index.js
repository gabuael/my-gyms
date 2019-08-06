import React, { Component } from 'react';
import { Dimensions } from 'react-native';

import api from '../../services/api';
import { Container, ListaAcademias } from './styles';
import CardAcademia from '../../components/CardAcademia';

const { width } = Dimensions.get('window');

export default class Home extends Component {
  state = {
    gyms: [],
    scroll: true,
  };

  componentDidMount() {
    this.findGyms();
  }

  handleScroll = scroll => {
    this.setState({ scroll });
  };

  findGyms = async () => {
    const response = await api.get('gyms');

    this.setState({ gyms: response.data });
  };

  render() {
    const { gyms, scroll } = this.state;
    return (
      <Container>
        <ListaAcademias
          data={gyms}
          keyExtractor={gym => String(gym.id)}
          renderItem={({ item }) => (
            <CardAcademia {...item} handleScroll={this.handleScroll} />
          )}
          horizontal
          snapToInterval={width * 0.976}
          decelerationRate="fast"
          snapToAlignment="center"
          scrollEnabled={scroll}
        />
      </Container>
    );
  }
}
