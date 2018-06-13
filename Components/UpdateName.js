import React from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { white, darkGreen, grey } from '../utils/colours';
import { updateSetName } from '../utils/api';
import { renameSet } from '../actions/flashcardSets';

class UpdateName extends React.Component {
  state = {
    setName: ''
  }

  componentDidMount() {
  	this.setState({
  		setName: this.props.setName
  	})
  }

  confirmUpdate() {
    updateSetName(this.props.setName, this.state.setName)
    .then(() => {
      this.props.dispatch(renameSet(this.props.itemId, this.state.setName))
    })
    .then(this.props.setUpdateModalVisible)
    .then(() => {
      const { navigation } = this.props;
      console.log(navigation)
      navigation.navigate(
        'SingleFlashcardSet',
        { itemName: this.state.setName }
      )
    })
  }

  submitUpdate = () => {
    if(this.state.setName === '') {
      alert('Make sure that no fields are empty');
    }
    else {
      Alert.alert(
        'Update',
        'Are you sure you want to update the name?',
        [
          {text: 'Yes', onPress: () => this.confirmUpdate()},
          {text: 'Cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
      	<Modal 
          visible={this.props.isUpdateVisible}
          animationType="slide"
          transparent={false}
        >
	        <KeyboardAvoidingView style={styles.contentContainer} behavior="padding" enabled>
	          <View style={styles.inputContainer}>
	            <TextInput
	              style={styles.inputStyle}
	              ref= {(el) => { this.username = el; }}
	              onChangeText={(setName) => this.setState({setName})}
	              value={this.state.setName}
	            />
	          </View>
	          <TouchableOpacity style={styles.buttonStyle} onPress={this.submitUpdate}>
	            <Text style={styles.buttonText}>Submit</Text>
	          </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButtonStyle} onPress={this.props.setUpdateModalVisible}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
	        </KeyboardAvoidingView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    padding: 2,
    backgroundColor: darkGreen,
    width: '70%'
  },
  inputStyle: {
    textAlign: 'center',
    backgroundColor: white,
    height: 50,
  },
  buttonStyle: {
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
  cancelButtonStyle: {
    //Raised
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    //
    backgroundColor: grey,
    marginTop: 20,
    width: '70%',
    padding: 15
  },
  buttonText: {
    color: white,
    textAlign: 'center'
  }
})


export default connect()(UpdateName);