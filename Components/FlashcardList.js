import React from 'react';
import { View, StyleSheet, ListView, TouchableOpacity, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { white, red } from '../utils/colours';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteSingleFlashcard } from '../utils/api';
import { removeFlashcard } from '../actions/flashcardSets';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class FlashcardList extends React.Component {
  constructor(props){
    super(props)

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  
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
      'Are you sure you want to delete this flashcard?',
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
      {console.log(flashcards)}
      {
        flashcards &&
        <SwipeListView
          dataSource={this.ds.cloneWithRows(flashcards)}
          renderRow={(data, secId, rowId, rowMap) => (
            <SwipeRow
              rightOpenValue={-75}
              >
              <View style={styles.rowBack}>
                <TouchableOpacity 
                  style={[styles.backRightBtn, styles.backRightBtnRight]} 
                  onPress={() => this.confirmDelete(data)}
                >
                  <MaterialIcons 
                    name='delete' 
                    color={white}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <ListItem
                containerStyle={{backgroundColor: white}}
                chevronColor={white}
                titleStyle={{textAlign: 'center'}}
                subtitleStyle={{textAlign: 'center'}}
                title={data.question}
                subtitle={data.answer}
              />
            </SwipeRow>
          )}
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
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: red,
    right: 0,
  },
})

const mapStateToProps = state => ({
  sets: state.sets
})

export default connect(mapStateToProps)(FlashcardList);