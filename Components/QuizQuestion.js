import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { darkBlue, darkGreen, white } from '../utils/colours';

class QuizQuestion extends React.Component {
  render () {
    const { questions, currentQuestionIndex, correctAnswers, navigation, itemName, numberOfQuestionsAsked } = this.props;
    let itemTitle =  navigation ? navigation.getParam('itemName') : itemName;
    return (
      <View style={styles.containerView}>
        <Card containerStyle={styles.questionCard}>
          {
            questions.length !== 0 &&
            <View style={{height: '100%'}}>
              <View style={styles.questionCardInner}>
                <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
                <TouchableOpacity style={styles.showAnswerButtonStyle} onPress={() => this.props.navigation.navigate(
                  'QuizAnswer',
                  { itemName: itemTitle, idFromQuestion: questions[currentQuestionIndex].id }
                )}>
                  <Text style={styles.buttonText}>Show Answer</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.remainingQuestionsText}>{`Questions Remaining: ${questions.length - numberOfQuestionsAsked}`}</Text>
            </View>
          }
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center'
  },
  questionCard: {
    height: '90%',
    marginTop: 0,
    justifyContent: 'center',
  },
  questionCardInner: {
    width: '100%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: darkBlue,
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 50
  },
  showAnswerButtonStyle: {
    backgroundColor: darkGreen,
    width: '70%',
    padding: 15
  },
  buttonText: {
    color: white,
    textAlign: 'center'
  },
  remainingQuestionsText: {
    textAlign: 'right',
    marginRight: 5,
    fontSize: 15,
    color: darkBlue,
    fontWeight: "300",
  }
})

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestionIndex: state.currentQuestionIndex,
  correctAnswers: state.correctAnswers,
  numberOfQuestionsAsked: state.numberOfQuestionsAsked
})

export default connect(mapStateToProps)(QuizQuestion);