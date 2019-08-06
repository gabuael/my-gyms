import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import api from '../../src/services/api';
import Home from '../../src/scenes/Home';

const apiMock = new MockAdapter(api);

const resultGet = [
  {
    id: 285079,
    title: 'Academia Bluefit - Vila Olímpia',
    logo:
      'https://gympass-staging-images-us.s3.amazonaws.com/image/filename/426232/logo_logo-01.jpg',
    activities: [
      {
        id: 156106,
        title: 'Musculação + Aulas',
      },
      {
        id: 3273872,
        title: 'Aulas',
      },
    ],
    rating: 4.53,
    address: 'Avenida Doutor Cardoso de Melo, 1191 - São Paulo - SP',
    location: {
      latitude: -23.5986007,
      longitude: -46.6851913,
    },
  },
];

describe('Home', () => {
  it('Find gyms', async () => {
    const { getByText } = render(<Home />);
    apiMock.onGet('gyms').reply(200, resultGet);

    await api.get('gyms');

    expect(getByText('Academia Bluefit - Vila Olímpia')).toBeTruthy();
  });

  it('Disable scroll', async () => {
    const { getByTestId } = render(<Home />);

    fireEvent.press(getByTestId('card-academia'));

    const { props } = getByTestId('scroll');

    expect(props.scrollEnabled).toEqual(true);
  });

  it('Enable scroll', async () => {
    const { getByTestId } = render(<Home />);

    fireEvent.press(getByTestId('card-academia'));

    fireEvent.press(getByTestId('x'));

    const { props } = getByTestId('scroll');

    expect(props.scrollEnabled).toEqual(true);
  });
});
