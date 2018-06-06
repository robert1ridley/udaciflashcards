import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import sets from './reducers';
import MyFlashcardSets from './Components/MyFlashcardSets';
import AddFlashcardSet from './Components/AddFlashcardSet';
import SingleFlashcardSet from './Components/SingleFlashcardSet';
import QuizView from './Components/QuizView';
import { white, purple, midBlack } from './utils/colours';
import QuizQuestion from './Components/QuizQuestion';
import QuizAnswer from './Components/QuizAnswer';
import QuizResult from './Components/QuizResult';

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

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack
      },
      title: 'My Flashcards'
    }
  },
  SingleFlashcardSet: {
    screen: SingleFlashcardSet,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack,
      },
      headerTitle: navigation.state.params.itemName
    })
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack,
      },
      headerTitle: `${navigation.state.params.itemName} Quiz`
    })
  },
  QuizQuestion: {
    screen: QuizQuestion,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack,
      },
      headerLeft: null,
      headerTitle: `${navigation.state.params.itemName} Quiz`
    })
  },
  QuizAnswer: {
    screen: QuizAnswer,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack,
      },
      headerLeft: null,
      headerTitle: `${navigation.state.params.itemName} Quiz`
    })
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: midBlack,
      },
      headerLeft: null,
      headerTitle: `${navigation.state.params.itemName} Quiz`
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={midBlack} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


