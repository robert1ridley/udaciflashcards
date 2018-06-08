import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { darkBlue, white, green, red } from '../utils/colours';
import { correctAnswer, getNextQuestion } from '../actions/flashcardSets';

class QuizAnswer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideAnswer: false
    }
    this.correctAnswer = this.correctAnswer.bind(this);
  }

  correctAnswer = () => {
    const { navigation, currentQuestionIndex, questions } = this.props;
    const itemName = navigation.getParam('itemName');
    this.setState({
      hideAnswer: true
    })
    this.props.dispatch(correctAnswer())
    if(currentQuestionIndex === questions.length-1){
      this.props.navigation.navigate(
        'QuizResult',
        { itemName: itemName }
      )
    }
    else {
      this.props.navigation.navigate(
        'QuizQuestion',
        { itemName: itemName }
      )
    }
  }

  incorrectAnswer = () => {
    const { navigation, currentQuestionIndex, questions } = this.props;
    const itemName = navigation.getParam('itemName');
    this.setState({
      hideAnswer: true
    })
    this.props.dispatch(getNextQuestion())
    if(currentQuestionIndex === questions.length-1){
      this.props.navigation.navigate(
        'QuizResult',
        { itemName: itemName }
      )
    }
    else {
      this.props.navigation.navigate(
        'QuizQuestion',
        { itemName: itemName }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.navigation.getParam('idFromQuestion') !== nextProps.navigation.getParam('idFromQuestion')) {
      this.setState({
        hideAnswer: false
      })
    }
  }

  render () {
    const { questions, currentQuestionIndex, correctAnswers, navigation, numberOfQuestionsAsked } = this.props;
    const { hideAnswer } = this.state;
    const itemName = navigation.getParam('itemName');
    return (
      <View style={styles.containerView}>
        <Card containerStyle={styles.questionCard}>
          {
            (questions.length !== 0 && !hideAnswer) &&
            <View style={{height: '100%'}}>
              <View style={styles.questionCardInner}>
                <Text style={styles.questionText}>{questions[currentQuestionIndex].answer}</Text>
                <TouchableOpacity style={styles.correctAnswerButtonStyle} onPress={() => this.correctAnswer()}>
                  <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrectAnswerButtonStyle} onPress={() => this.incorrectAnswer()}>
                  <Text style={styles.buttonText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.remainingQuestionsText}>{`Question Remaining: ${questions.length - numberOfQuestionsAsked}`}</Text>
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
    height: '95%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: darkBlue,
    fontSize: 30,
    fontWeight: "300",
    marginBottom: 50
  },
  correctAnswerButtonStyle: {
    backgroundColor: green,
    width: '70%',
    padding: 15
  },
  incorrectAnswerButtonStyle: {
    backgroundColor: red,
    marginTop: 20,
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

export default connect(mapStateToProps)(QuizAnswer);