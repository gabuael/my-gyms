import React, { Component } from 'react';

import { Text } from 'react-native';
import api from '../../services/api';

import { Container, ListaAcademias } from './styles';

import CardAcademia from '../../components/CardAcademia';

export default class Home extends Component {
  state = {
    gyms: [],
  };

  componentDidMount() {
    this.findGyms();
  }

  findGyms = async () => {
    const response = await api.get('gyms');

    this.setState({ gyms: response.data });
  };

  render() {
    const { gyms } = this.state;
    return (
      <Container>
        <ListaAcademias
          data={gyms}
          keyExtractor={gym => String(gym.id)}
          renderItem={({ item }) => <CardAcademia {...item} />}
          horizontal
        />
      </Container>
    );
  }
}
