import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListaAcademias = styled.FlatList`
  margin-bottom: ${props => (props.scrollEnabled ? '40px' : '-7px')};
  margin-left: 15px;
  position: absolute;
  z-index: 9;
  bottom: 0;
  height: ${props => (!props.horizontal ? '80%' : 'auto')};
`;

export const Pesquisa = styled.View`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  margin-top: 45px;
  flex-direction: row;
  position: absolute;
  z-index: 10;
  top: 0;
  width: 90%;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'Faça sua pesquisa',
  placeholderTextColor: '#999999',
  autoCorrect: false,
})`
  width: 80%;
  margin-left: 10px;
  font-size: 16px;
  color: #4f4f4f;
`;

export const ButtonX = styled.TouchableOpacity.attrs({
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})``;
