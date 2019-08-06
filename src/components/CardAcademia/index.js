import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
import api from '../../services/api';

const check = require('../../assets/check.png');
const notCheck = require('../../assets/not-check.png');

const { width } = Dimensions.get('window');

class CardAcademia extends Component {
  state = {
    moreInfo: false,
    activities: [],
  };

  componentDidMount() {
    const { activities } = this.props;
    this.setState({ activities });
  }

  handleMoreInfo = moreInfo => {
    const { handleScroll } = this.props;
    this.setState({ moreInfo });
    handleScroll(!moreInfo);
  };

  handleCheckout = async (gymId, activityId) => {
    const { activities } = this.state;
    const index = activities.findIndex(activity => activity.id === activityId);
    activities[index].gymId = gymId;
    activities[index].checkin = false;

    const activitiesCheckin = JSON.parse(
      await AsyncStorage.getItem('activitiesCheckin')
    );

    const indexCheckin = activitiesCheckin.findIndex(
      activity => activity.id === activityId
    );

    activitiesCheckin.splice(indexCheckin, 1);

    await AsyncStorage.setItem(
      'activitiesCheckin',
      JSON.stringify(activitiesCheckin)
    );
    this.setState({ activities: [...activities] });
  };

  handleCheckin = async (gymId, activityId) => {
    const { activities } = this.state;
    const index = activities.findIndex(activity => activity.id === activityId);
    await api.post('checkin', {
      gymId,
      activityId,
    });

    activities[index].gymId = gymId;

    let activitiesCheckin = JSON.parse(
      await AsyncStorage.getItem('activitiesCheckin')
    );
    activitiesCheckin = activitiesCheckin || [];
    await AsyncStorage.setItem(
      'activitiesCheckin',
      JSON.stringify([...activitiesCheckin, activities[index]])
    );

    activities[index].checkin = true;
    this.setState({ activities: [...activities] });
  };

  render() {
    const { title, address, rating, logo, id } = this.props;
    const { moreInfo, activities } = this.state;
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
                <CardActivity
                  key={activity.id}
                  onPress={() =>
                    !activity.checkin
                      ? this.handleCheckin(id, activity.id)
                      : this.handleCheckout(id, activity.id)
                  }
                  testID={`card ${activity.title}`}
                >
                  <Activity>{activity.title}</Activity>
                  <IconCheckin
                    source={activity.checkin ? check : notCheck}
                    testID={`icon ${activity.title}`}
                  />
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
  id: PropTypes.number.isRequired,
};

export default CardAcademia;
