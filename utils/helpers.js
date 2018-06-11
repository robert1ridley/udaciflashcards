import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import { NOTIFICATION_KEY } from './api';

export const generateUid = () => {
  function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export function formatData (results) {
  results = JSON.parse(results);
  results = results === null ? [] : Object.keys(results).map(key => results[key]);
  return results;
}

export function questionRandomizer(thisSet) {
  for(var j, x, i = thisSet.length; i; j = Math.floor(Math.random() * i), x = thisSet[--i], thisSet[i] = thisSet[j], thisSet[j] = x);
  return thisSet;
}

export function getDate () {
  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth()+1;
  var yyyy = currentDate.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  currentDate = mm + '/' + dd + '/' + yyyy;
  return currentDate;
}

export async function setLocalNotification(quizCompleted) {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status === 'granted') {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((notified) => {
      if(notified === null) {
        const dateToday = getDate();
        if (quizCompleted[dateToday] === false) {
          Notifications.cancelAllScheduledNotificationsAsync()
          let sendTime = new Date();
          sendTime.setHours(18)
          sendTime.setMinutes(0)
          if(sendTime < new Date ()) {
            sendTime.setDate(sendTime.getDate() + 1)
          }
          Notifications.scheduleLocalNotificationAsync(
            newNotification(),
            {
              time: sendTime,
              repeat: 'day',
            }
          )
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        } 
      }
    })
  }
  else if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export function cancelNotifications () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function newNotification () {
  return {
    title: 'Remember to complete a quiz',
    body: "don't forget to complete a quiz today",
    ios: {
      sound: true,
    },
  }
}