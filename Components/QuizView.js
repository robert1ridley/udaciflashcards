import React from 'react';
import { connect } from 'react-redux';
import { questionRandomizer } from '../utils/helpers';
import { setQuizQuestions, resetQuiz } from '../actions/flashcardSets';
import QuizQuestion from './QuizQuestion';

class QuizView extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;
    const thisSet = navigation.getParam('thisSet');
    const randomizedQuestions = questionRandomizer(thisSet.flashcards)
    this.props.dispatch(setQuizQuestions(randomizedQuestions));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.navigation.getParam('quizId') !== this.props.navigation.getParam('quizId')) {
      const { navigation } = nextProps;
      const quizId = navigation.getParam('quizId');
      const thisSet = navigation.getParam('thisSet');
      if(quizId) {
        const randomizedQuestions = questionRandomizer(thisSet.flashcards)
        this.props.dispatch(setQuizQuestions(randomizedQuestions));
      }
    }
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