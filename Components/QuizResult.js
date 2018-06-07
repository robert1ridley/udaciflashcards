import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { midBlack, white, purple } from '../utils/colours';
import { generateUid } from '../utils/helpers';

class QuizResult extends React.Component {
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
    color: midBlack,
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 10
  },
  purpleButtonStyle: {
    backgroundColor: purple,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  whiteButtonStyle: {
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
    color: purple,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  questions: state.questions,
  correctAnswers: state.correctAnswers,
})

export default connect(mapStateToProps)(QuizResult);