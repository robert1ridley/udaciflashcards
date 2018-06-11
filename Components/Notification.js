import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, Platform } from 'react-native';
import { setLocalNotification } from '../utils/helpers';
import { Notifications } from 'expo';

class Notification extends React.Component {
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert("Remember to complete a quiz", "don't forget to complete a quiz today");
      }
    });
  };
  componentDidMount() {
    const { quizForToday } = this.props;
    Object.keys(quizForToday) !== null && setLocalNotification(quizForToday)
    this.listenForNotifications();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.quizForToday !== this.props.quizForToday) {
      const { quizForToday } = nextProps;
      setLocalNotification(quizForToday)
    }
  }

  render() {
    return <View />
  }
}

const mapStateToProps = state => ({
  quizForToday: state.quizForToday
})

export default connect(mapStateToProps)(Notification);