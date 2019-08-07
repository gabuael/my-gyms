import styled from 'styled-components/native';

export const LogoMarkerContainer = styled.View`
  background: #fff;
  border-radius: 5px;
  padding: 10px 5px 15px 5px;
  margin-bottom: -10px;
  align-items: center;
`;

export const LogoMarker = styled.Image`
  width: 25px;
  height: 25px;
`;

export const MarkerBottom = styled.View`
  flex: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 16px;
  width: 46px;
  background: ${props => (props.select ? '#0094ff' : '#B3BABF')};
`;

export const MarkerTriangle = styled.View`
  border-color: transparent;
  border-width: 5px;
  align-self: center;
  border-top-color: ${props => (props.select ? '#0094ff' : '#B3BABF')};
`;

export const MarkerEmptySpace = styled.View`
  background: transparent;
  height: 47px;
  align-self: center;
`;
