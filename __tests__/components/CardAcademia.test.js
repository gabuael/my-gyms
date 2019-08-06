import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import CardAcademia from '../../src/components/CardAcademia';

const academia = {
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
};

describe('CardAcademia', () => {
  it('Render activities', () => {
    const { getByTestId, getByText } = render(
      <CardAcademia {...academia} handleScroll={jest.fn()} />
    );

    fireEvent.press(getByTestId('card-academia'));

    expect(getByText('Musculação + Aulas')).toBeTruthy();
  });

  it('Close activities', () => {
    const { getByTestId } = render(
      <CardAcademia {...academia} handleScroll={jest.fn()} />
    );

    fireEvent.press(getByTestId('card-academia'));
    fireEvent.press(getByTestId('x'));

    expect(getByTestId('rating')).toBeTruthy();
  });
});
