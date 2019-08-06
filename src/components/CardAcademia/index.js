import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
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
  CardActivity,
  Activity,
  ListActivities,
  ButtonX,
} from './styles';

const check = require('../../assets/check.png');

const { width } = Dimensions.get('window');

class CardAcademia extends Component {
  state = {
    moreInfo: false,
  };

  handleMoreInfo = moreInfo => {
    const { handleScroll } = this.props;
    this.setState({ moreInfo });
    handleScroll(!moreInfo);
  };

  render() {
    const { title, address, rating, logo, activities } = this.props;
    const { moreInfo } = this.state;
    return (
      <Container
        onPress={() => this.handleMoreInfo(true)}
        testID="card-academia"
        style={{ width: Math.round(width * 0.9) }}
        disabled={moreInfo}
      >
        <GymInfos>
          <Avatar source={{ url: logo }} />
          <Infos>
            <Title>{title}</Title>
            <Address>{address}</Address>
          </Infos>
          <Left>
            {!moreInfo ? (
              <IconCheckin source={check} />
            ) : (
              <ButtonX onPress={() => this.handleMoreInfo(false)} testID="x">
                <Icon name="x" size={20} color="#0094FF" />
              </ButtonX>
            )}
            {!moreInfo && (
              <Rating testID="rating">
                <RatingText>{rating}</RatingText>
                <Icon name="star" size={16} color="#0094FF" />
              </Rating>
            )}
          </Left>
        </GymInfos>
        {moreInfo && (
          <GymMoreInfos>
            <ListActivities horizontal>
              {activities.map(activity => (
                <CardActivity key={activity.id}>
                  <Activity>{activity.title}</Activity>
                  <IconCheckin source={check} />
                </CardActivity>
              ))}
            </ListActivities>
            <Rating>
              <RatingText>{rating}</RatingText>
              <Icon name="star" size={16} color="#0094FF" />
            </Rating>
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
  handleScroll: PropTypes.func.isRequired,
};

export default CardAcademia;
