import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { purple, white, grey } from '../utils/colours';
import { addFlashcardToSet } from '../utils/api';
import { generateUid } from '../utils/helpers';
import { addFlashcard } from '../actions/flashcardSets';

class SingleFlashcardSet extends React.Component {
  state = {
    isVisible: false,
    question: '',
    answer: ''
  }

  setModalVisible(visible) {
    this.setState({isVisible: visible});
  }

  submitNewFlashcard(visible) {
    const setId = generateUid();
    const flashcard = {
      question: this.state.question,
      answer: this.state.answer,
      id: setId
    }
    const { navigation } = this.props;
    const itemName = navigation.getParam('itemName');
    const itemId = navigation.getParam('itemId');
    addFlashcardToSet(itemName, flashcard)
    .then(() => {
      this.props.dispatch(addFlashcard(itemId, flashcard))
    })
    .then(() => this.setState({isVisible: visible, question: '', answer: ''}))
  }

  render() {
    const { navigation, sets } = this.props;
    const itemId = navigation.getParam('itemId');
    const itemName = navigation.getParam('itemName');
    const thisSetList = sets.filter(item => item.id === itemId);
    thisSet = thisSetList[0];
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.info}>Total Flashcards: </Text>
        <Badge
          containerStyle={{margin: 10, backgroundColor: purple}}
          value={thisSet.flashcards.length}
          textStyle={{ color: white }}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.setState({isVisible: true})}>
          <Text style={styles.buttonText}>Add Flashcard</Text>
        </TouchableOpacity>
        {
          thisSet.flashcards.length !== 0 &&
          <TouchableOpacity style={styles.quizButtonStyle} onPress={() => this.props.navigation.navigate(
            'QuizView',
            { itemName: itemName, itemId: itemId, thisSet: thisSet }
          )}>
            <Text style={styles.quizButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        }
        <View>
          <Modal 
            visible={this.state.isVisible}
            animationType="slide"
            transparent={false}
          >
            <KeyboardAvoidingView style={styles.modalInnerContainer} behavior="padding" enabled>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Question"
                  ref= {(el) => { this.question = el; }}
                  onChangeText={(question) => this.setState({question})}
                  value={this.state.question}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Answer"
                  ref= {(el) => { this.answer = el; }}
                  onChangeText={(answer) => this.setState({answer})}
                  value={this.state.answer}
                />
              </View>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.submitNewFlashcard(!this.state.isVisible)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButtonStyle} onPress={() => {
                  this.setModalVisible(!this.state.isVisible);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  modalInnerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingLeft: 60,
    paddingRight: 60
  },
  buttonStyle: {
    backgroundColor: purple,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  buttonText: {
    color: white,
    textAlign: 'center'
  },
  cancelButtonStyle: {
    backgroundColor: grey,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  quizButtonStyle: {
    backgroundColor: white,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  quizButtonText: {
    color: purple,
    textAlign: 'center'
  },
  inputContainer: {
    padding: 2,
    backgroundColor: purple,
    width: '100%',
    margin: 10
  },
  inputStyle: {
    textAlign: 'center',
    backgroundColor: white,
    height: 50,
  },
  info: {
    marginTop: 100,
    fontSize: 16,
    fontWeight: '500',
    color: grey
  }
})

const mapStateToProps = state => ({
  sets: state.sets
})

export default connect(mapStateToProps)(SingleFlashcardSet);