import React, { Component } from 'react';
import { Dimensions, Keyboard } from 'react-native';

import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import escapeRegExp from 'escape-string-regexp';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import { Container, ListaAcademias, Pesquisa, Input, ButtonX } from './styles';
import CardAcademia from '../../components/CardAcademia';
import Marker from '../../components/Marker';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {
  state = {
    gyms: [],
    scroll: true,
    horizontal: true,
    gymsSelect: [],
    search: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
  };

  componentDidMount() {
    this.findGyms();
  }

  setGymsCheckin = async () => {
    const { gymsSelect } = this.state;
    const activitiesCheckin = JSON.parse(
      await AsyncStorage.getItem('activitiesCheckin')
    );
    const i = [];
    activitiesCheckin.forEach(activityCheckin => {
      gymsSelect.forEach((gym, index) => {
        if (activityCheckin.gymId === gym.id) {
          gymsSelect[index].checkin = true;
          i[index] = true;
        } else if (!i[index]) {
          gymsSelect[index].checkin = false;
        }
      });
    });
    this.setState({ gymsSelect });
  };

  findGyms = async () => {
    const response = await api.get('gyms');
    response.data[0].select = true;

    const activitiesCheckin = JSON.parse(
      await AsyncStorage.getItem('activitiesCheckin')
    );
    if (activitiesCheckin) {
      activitiesCheckin.forEach(activityCheckin => {
        response.data.forEach((gym, index) => {
          if (activityCheckin.gymId === gym.id) {
            response.data[index].checkin = true;
          }
        });
      });
    }

    this.setState({
      gyms: response.data,
      gymsSelect: response.data,
      location: response.data[0].location,
    });
  };

  handleGymSelect = index => {
    const { gymsSelect } = this.state;

    const indexAfterSelect = gymsSelect.findIndex(gym => gym.select === true);
    if (indexAfterSelect !== -1) {
      gymsSelect[indexAfterSelect].select = false;
    }
    gymsSelect[index].select = true;

    this.setState({
      gymsSelect: [...gymsSelect],
      location: gymsSelect[index].location,
    });
  };

  handleScroll = scroll => {
    this.setState({ scroll });
  };

  handleListOrientation = horizontal => {
    const { gyms } = this.state;
    if (horizontal) {
      Keyboard.dismiss();
      this.setState({ horizontal, gymsSelect: gyms, search: '' });
    } else {
      this.setState({ horizontal });
    }
  };

  handleSearch = search => {
    const { gyms } = this.state;
    const match = new RegExp(escapeRegExp(search), 'i');

    const gymsSelect = gyms.filter(_ => match.test(_.title));

    this.setState({ gymsSelect, search });
  };

  render() {
    const { gymsSelect, scroll, horizontal, search, location } = this.state;
    return (
      <Container>
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          style={{ width, height }}
          showsUserLocation
        >
          {gymsSelect.map(({ location: locationGym, logo, id, select }) => (
            <Marker
              location={locationGym}
              logo={logo}
              key={id}
              select={select}
            />
          ))}
        </MapView>
        <Pesquisa>
          <Icon name="search" size={20} color="#0094FF" />
          <Input
            onFocus={() => this.handleListOrientation(false)}
            onChangeText={this.handleSearch}
            value={search}
          />
          {!horizontal && (
            <ButtonX onPress={() => this.handleListOrientation(true)}>
              <Icon name="x" size={20} color="#0094FF" />
            </ButtonX>
          )}
        </Pesquisa>
        <ListaAcademias
          testID="scroll"
          data={gymsSelect}
          keyExtractor={gym => String(gym.id)}
          renderItem={({ item }) => (
            <CardAcademia
              {...item}
              handleScroll={this.handleScroll}
              setGymsCheckin={this.setGymsCheckin}
            />
          )}
          horizontal={horizontal}
          snapToInterval={width * 0.976}
          decelerationRate="fast"
          snapToAlignment="center"
          scrollEnabled={scroll}
          onMomentumScrollEnd={e =>
            horizontal &&
            this.handleGymSelect(
              Math.round(e.nativeEvent.contentOffset.x / (width * 0.976))
            )
          }
        />
      </Container>
    );
  }
}
