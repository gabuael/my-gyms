import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

import { Text } from 'react-native';
import {
  Container,
  Avatar,
  Infos,
  Title,
  Address,
  Left,
  IconCheckin,
  Rating,
  RatingText,
  GymInfos,
  GymMoreInfos,
  ListActivities,
} from './styles';

const check = require('../../assets/check.png');

class CardAcademia extends Component {
  state = {
    moreInfo: false,
  };

  render() {
    const { title, address, rating, logo, activities } = this.props;
    const { moreInfo } = this.state;
    return (
      <Container
        onPress={() => this.setState({ moreInfo: !moreInfo })}
        testID="card-academia"
      >
        <GymInfos>
          <Avatar source={{ url: logo }} />
          <Infos>
            <Title>{title}</Title>
            <Address>{address}</Address>
          </Infos>
          <Left>
            <IconCheckin source={check} />
            <Rating>
              <RatingText>{rating}</RatingText>
              <Icon name="star" size={16} color="#0094FF" />
            </Rating>
          </Left>
        </GymInfos>
        {moreInfo && (
          <GymMoreInfos>
            <ListActivities
              data={activities}
              keyExtractor={activity => String(activity.id)}
              renderItem={({ item }) => <Text>{item.title}</Text>}
              horizontal
            />
          </GymMoreInfos>
        )}
      </Container>
    );
  }
}

CardAcademia.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
};

export default CardAcademia;
