import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { questionRandomizer } from '../utils/helpers';
import { midBlack, purple, white } from '../utils/colours';
import { setQuizQuestions } from '../actions/flashcardSets';

class QuizView extends React.Component {

  componentDidMount() {
    const { navigation } = this.props;
    const thisSet = navigation.getParam('thisSet');
    const randomizedQuestions = questionRandomizer(thisSet.flashcards)
    this.props.dispatch(setQuizQuestions(randomizedQuestions));
  }

  render () {
    const { questions, currentQuestionIndex, correctAnswers } = this.props;
    return (
      <View style={styles.containerView}>
        <Card containerStyle={styles.questionCard}>
          {
            questions.length !== 0 &&
            <View style={styles.questionCardInner}>
              <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
              <TouchableOpacity style={styles.showAnswerButtonStyle}>
                <Text style={styles.buttonText}>Show Answer</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
  },
  questionCardInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: midBlack,
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 10
  },
  showAnswerButtonStyle: {
    backgroundColor: purple,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  buttonText: {
    color: white,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestionIndex: state.currentQuestionIndex,
  correctAnswers: state.correctAnswers,
})

export default connect(mapStateToProps)(QuizView);