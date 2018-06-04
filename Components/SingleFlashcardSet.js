import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
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
    // .then(() => {
    //   this.props.dispatch(addFlashcard(itemId, flashcard))
    // })
    .then(() => this.setState({isVisible: visible}))
  }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.setState({isVisible: true})}>
          <Text style={styles.buttonText}>Add Flashcard</Text>
        </TouchableOpacity>
        <View>
          <Modal 
            visible={this.state.isVisible}
            animationType="slide"
            transparent={false}
          >
            <View style={styles.modalInnerContainer}>
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
            </View>
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
  }
})

export default connect()(SingleFlashcardSet);