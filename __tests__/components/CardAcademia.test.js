import React from 'react';

import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
} from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import api from '../../src/services/api';
import CardAcademia from '../../src/components/CardAcademia';

const academia = {
  id: 285079,
  title: 'Academia Bluefit - Vila Olímpia',
  logo:
    'https://gympass-staging-images-us.s3.amazonaws.com/image/filename/426232/logo_logo-01.jpg',
  activities: [
    {
      id: 0,
      title: 'Musculação + Aulas',
    },
    {
      id: 1,
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
const apiMock = new MockAdapter(api);
const check = require('../../src/assets/check.png');

afterEach(cleanup);

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

  it('Checkin activity', async () => {
    const { getByTestId } = render(
      <CardAcademia {...academia} handleScroll={jest.fn()} />
    );

    fireEvent.press(getByTestId('card-academia'));

    await apiMock.onPost('checkin').reply(200);

    fireEvent.press(getByTestId('card Musculação + Aulas'));

    const { props } = await waitForElement(() =>
      getByTestId('icon Musculação + Aulas')
    );

    expect(props.source).toEqual(check);
  });
});
