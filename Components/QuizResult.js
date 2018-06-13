import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { darkBlue, white, darkGreen } from '../utils/colours';
import { generateUid, getDate, cancelNotifications } from '../utils/helpers';
import { addQuizScore } from '../utils/api';
import { quizCompleted } from '../actions/flashcardSets';

class QuizResult extends React.Component {
  componentDidMount() {
    const currentDate = getDate()
    addQuizScore(currentDate)
    .then(() => {
      this.props.dispatch(quizCompleted(currentDate, true))
    })
    .then(() => cancelNotifications())
  }
  render () {
    const { questions, correctAnswers, navigation } = this.props;
    const itemName = navigation.getParam('itemName');
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.resultText}>{`${correctAnswers}/${questions.length}`}</Text>
        <TouchableOpacity style={styles.purpleButtonStyle} onPress={() => this.props.navigation.navigate(
          'QuizView',
          { itemName: itemName, quizId: generateUid() }
        )}>
          <Text style={styles.regButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButtonStyle} onPress={() => this.props.navigation.navigate(
          'SingleFlashcardSet',
          { itemName: itemName }
        )}>
          <Text style={styles.whiteButtonText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    color: darkBlue,
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 10
  },
  purpleButtonStyle: {
    //Raised
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    //
    backgroundColor: darkGreen,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  whiteButtonStyle: {
    //Raised
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    //
    backgroundColor: white,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  regButtonText: {
    color: white,
    textAlign: 'center'
  },
  whiteButtonText: {
    color: darkGreen,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  questions: state.questions,
  correctAnswers: state.correctAnswers,
})

export default connect(mapStateToProps)(QuizResult);