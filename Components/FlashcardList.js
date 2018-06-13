import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { white, red } from '../utils/colours';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteSingleFlashcard } from '../utils/api';
import { removeFlashcard } from '../actions/flashcardSets';

class FlashcardList extends React.Component {
  
  deleteFlashcard(flashcard) {
    const { sets, navigation } = this.props;
    const itemName = navigation.getParam('itemName');
    const itemId = navigation.getParam('itemId');
    deleteSingleFlashcard(itemName, flashcard)
    .then(() => {
      this.props.dispatch(removeFlashcard(itemId, flashcard))
    })
    .then(() => {
      let currentSet = sets.filter(item => item.id === itemId);
      currentSet = currentSet[0];
      currentSet.flashcards.length <= 1 &&
      navigation.navigate(
        'SingleFlashcardSet',
        { itemId: itemId, itemName: itemName }
      )
    })
  }

  confirmDelete(flashcard) {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete the set?',
      [
        {text: 'Yes', onPress: () => this.deleteFlashcard(flashcard)},
        {text: 'Cancel'},
      ],
      { cancelable: false }
    )
  }

  _keyExtractor = (item) => item.id;
  render() {
    const { sets, navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    let currentSet = sets.filter(item => item.id === itemId);
    currentSet = currentSet[0];
    const flashcards = currentSet.flashcards;
    return (
      <View style={{flex: 1}}>
      {
        flashcards &&
        <FlatList
          data={flashcards}
          renderItem={({item}) => 
          <ListItem
            title={item.question}
            subtitle={item.answer}
            rightIcon={<MaterialIcons name='delete' size={30} color={red} onPress={() => this.confirmDelete(item)} />}
          />
          }
          keyExtractor={this._keyExtractor}
        />
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deleteContainer: {
    backgroundColor: red
  },
  deleteText: {
    color: white
  }
})

const mapStateToProps = state => ({
  sets: state.sets
})

export default connect(mapStateToProps)(FlashcardList);