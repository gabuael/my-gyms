import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 17px;
  background: #fff;
  border-radius: 10px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  margin: 8px;
  margin-right: 20px;
`;

export const Avatar = styled.Image`
  width: 65px;
  height: 65px;
  background: #ccc;
  margin-right: 7px;
`;
export const Infos = styled.View`
  margin-right: 20px;
  max-width: 170px;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 15px;
  color: #4f4f4f;
  font-weight: bold;
  margin-bottom: 2px;
`;
export const Address = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 11px;
  color: #888888;
  font-weight: bold;
`;
export const Left = styled.View`
  justify-content: space-between;
  align-items: flex-end;
`;
export const IconCheckin = styled.Image`
  width: 18px;
  height: 18px;
`;
export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
export const RatingText = styled.Text`
  font-size: 13px;
  color: #0094ff;
  font-weight: bold;
  margin-right: 2px;
`;
export const GymInfos = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GymMoreInfos = styled.View`
  margin-top: 17px;
  margin-bottom: 40px;
`;

export const ListActivities = styled.ScrollView`
  margin: 8px;
  margin-bottom: 6px;
`;

export const CardActivity = styled.View`
  background: #fff;
  border-radius: 10px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  padding: 15px;
  margin: 8px;
  flex-direction: row;
`;

export const Activity = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 17px;
  color: #4f4f4f;
  font-weight: 500;
  margin-right: 25px;
  width: 95px;
`;

export const ButtonX = styled.TouchableOpacity``;
