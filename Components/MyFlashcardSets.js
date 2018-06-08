import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card } from 'react-native-elements';
import { fetchFlashcardSets } from '../utils/api';
import { formatData } from '../utils/helpers';
import { white, black, grey } from '../utils/colours';
import { fetchSets } from '../actions/flashcardSets';

class MyFlashcardSets extends React.Component {
  componentDidMount() {
    fetchFlashcardSets()
      .then(result => 
        formatData(result)
      )
      .then(data => {
        this.props.dispatch(fetchSets(data))
      }
    )
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const { sets } = this.props;
    return (
      <View style={styles.pageContainer}>
        {
          sets.length!==0 ?
          <FlatList
            data={sets}
            renderItem={({item}) => 
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'SingleFlashcardSet',
                  { itemId: item.id, itemName: item.setName }
                )}
              >
                <Card>
                  <Text style={styles.headText}>{item.setName}</Text>
                  <Text style={styles.subText}>{`${item.flashcards.length} Flashcards`}</Text>
                </Card>
              </TouchableOpacity>

            }
            keyExtractor={this._keyExtractor}
          /> :
          <View style={styles.notificationContainer}>
            <Text style={styles.subText}>You haven't added any flashcard sets yet!</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  headText: {
    color: black,
    fontWeight: "700"
  },
  subText: {
    color: grey,
    fontWeight: "100"
  },
  notificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  sets: state.sets
});


export default connect(mapStateToProps)(MyFlashcardSets);