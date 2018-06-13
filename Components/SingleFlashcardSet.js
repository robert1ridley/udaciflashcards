import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { darkGreen, white, grey, red, darkBlue } from '../utils/colours';
import { addFlashcardToSet, deleteSet } from '../utils/api';
import { generateUid } from '../utils/helpers';
import { addFlashcard } from '../actions/flashcardSets';
import { removeSet } from '../actions/flashcardSets';

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
    if (this.state.question === '' || this.state.answer === '') {
      alert("Don't leave any fields blank!")
    }
    else {
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
  }

  confirmDelete(){
    const { navigation, sets } = this.props;
    const itemName = navigation.getParam('itemName');
    const itemId = navigation.getParam('itemId');
    let setToDelete = sets.filter(item => item.id === itemId);
    setToDelete = setToDelete[0];
    deleteSet(itemName)
    .then(() => {
      this.props.dispatch(removeSet(setToDelete))
    })
    .then(() => {
      navigation.navigate(
        'Home'
      )
    })
  }

  deleteSet() {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete the set?',
      [
        {text: 'Yes', onPress: () => this.confirmDelete()},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { navigation, sets } = this.props;
    const itemId = navigation.getParam('itemId');
    const itemName = navigation.getParam('itemName');
    const thisSetList = sets.filter(item => item.id === itemId);
    let thisSet = thisSetList[0];
    if(thisSet) {
      return (
        <View style={styles.pageContainer}>
          <Text style={styles.info}>Total Flashcards: </Text>
          <Badge
            containerStyle={{margin: 10, backgroundColor: darkGreen}}
            value={thisSet.flashcards.length}
            textStyle={{ color: white }}
          />
          {
            thisSet.flashcards.length !== 0 &&
            <TouchableOpacity style={styles.quizButtonStyle} onPress={() => this.props.navigation.navigate(
              'QuizView',
              { itemName: itemName, itemId: itemId, thisSet: thisSet }
            )}>
              <Text style={styles.quizButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          }
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Icon
              reverse
              raised
              name='add-to-list'
              onPress={() => this.setState({isVisible: true})}
              type='entypo'
              color={darkGreen}
            />
            {
              thisSet.flashcards.length !== 0 &&
              <Icon
                reverse
                raised
                name='cards'
                onPress={() => this.props.navigation.navigate(
                  'FlashcardList',
                  { itemName: itemName, itemId: itemId, thisSet: thisSet }
                )}
                type='material-community'
                color={darkBlue}
              />
            }
            <Icon
              reverse
              raised
              name='edit'
              type='entypo'
              color='#2089dc'
            />
            <Icon
              reverse
              raised
              name='delete'
              onPress={() => this.deleteSet()}
              type='material-community'
              color={red}
            />
          </View>
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
    } else return <View/>
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
    backgroundColor: darkGreen,
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
  quizButtonText: {
    color: darkGreen,
    textAlign: 'center'
  },
  deleteButtonStyle: {
    backgroundColor: red,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  inputContainer: {
    padding: 2,
    backgroundColor: darkGreen,
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