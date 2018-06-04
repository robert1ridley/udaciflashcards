import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { white, purple } from '../utils/colours';
import { generateUid } from '../utils/helpers';
import { addFlashcardSet } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class AddFlashcardSet extends React.Component {
  state = {
    setName: ''
  }

  submitNewSet = () => {
    const setId = generateUid();

    const data = {
      setName: this.state.setName,
      id: setId,
      flashcards: []
    }
    addFlashcardSet(data)
    .then(this.props.navigation.dispatch(NavigationActions.back({key: 'AddFlashcardSet'})));
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <Header
            placement="left"
            centerComponent={{ text: 'ADD FLASHCARD SET', style: { color: white } }}
          />
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Name of Flashcard Set"
              ref= {(el) => { this.username = el; }}
              onChangeText={(setName) => this.setState({setName})}
              value={this.state.setName}
            />
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={this.submitNewSet}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    padding: 2,
    backgroundColor: purple,
    width: '70%'
  },
  inputStyle: {
    textAlign: 'center',
    backgroundColor: white,
    height: 50,
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
  }
})


export default AddFlashcardSet;