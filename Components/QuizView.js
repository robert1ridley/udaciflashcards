import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { questionRandomizer } from '../utils/helpers';
import { midBlack, purple, white } from '../utils/colours';
import { setQuizQuestions } from '../actions/flashcardSets';
import QuizQuestion from './QuizQuestion';

class QuizView extends React.Component {
  componentDidMount() {
    console.log("MOUNTED")
    const { navigation } = this.props;
    const thisSet = navigation.getParam('thisSet');
    const randomizedQuestions = questionRandomizer(thisSet.flashcards)
    this.props.dispatch(setQuizQuestions(randomizedQuestions));
  }

  render () {
    const { navigation } = this.props;
    const itemName = navigation.getParam('itemName');
    return (
      <QuizQuestion navigation={navigation} itemName={itemName}/>
    )
  }
}

export default connect()(QuizView);