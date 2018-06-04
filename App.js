import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createBottomTabNavigator } from 'react-navigation';
import { Constants } from 'expo'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import sets from './reducers';
import MyFlashcardSets from './Components/MyFlashcardSets';
import AddFlashcardSet from './Components/AddFlashcardSet';
import { white, purple } from './utils/colours';

const logger = createLogger();
const store = createStore(
  sets,
  applyMiddleware(thunk, promise, logger)
);

const AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  MyFlashcardSets: {
    screen: MyFlashcardSets,
    navigationOptions: {
      tabBarLabel: 'My Sets',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddFlashcardSet: {
    screen: AddFlashcardSet,
    navigationOptions: {
      tabBarLabel: 'Add Flashcard Set',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
