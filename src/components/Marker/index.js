import React from 'react';
import { Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

import {
  LogoMarkerContainer,
  LogoMarker,
  MarkerBottom,
  MarkerTriangle,
  MarkerEmptySpace,
} from './styles';

export default function MarkerComponent({ location, logo, select }) {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    >
      <LogoMarkerContainer>
        <LogoMarker
          source={{
            url: logo,
          }}
        />
      </LogoMarkerContainer>
      <MarkerBottom select={select} />
      <>
        <MarkerTriangle select={select} />
        {Platform.OS === 'ios' && <MarkerEmptySpace />}
      </>
    </Marker>
  );
}

MarkerComponent.defaultProps = {
  select: false,
};

MarkerComponent.propTypes = {
  location: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  select: PropTypes.bool,
};
