import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Header } from 'react-native-elements';
import { fetchFlashcardSets } from '../utils/api';
import { formatData } from '../utils/helpers';
import { purple, white, black, grey } from '../utils/colours';
import { fetchSets } from '../actions/flashcardSets';

class MyFlashcardSets extends React.Component {
  state = {
    data: {}
  }
  componentDidMount() {
    fetchFlashcardSets()
      .then(result => 
        formatData(result)
      )
      .then(data => {
        this.setState({
          data: data
        })
        this.props.dispatch(fetchSets(data))
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sets !== nextProps.sets) {
      fetchFlashcardSets()
      .then(result => 
        formatData(result)
      )
      .then(data => {
        this.setState({
          data: data
        })
          this.props.dispatch(fetchSets(data))
        }
      )
    }
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const { data } = this.state;
    return (
      <View style={styles.pageContainer}>
        <Header
          placement="left"
          centerComponent={{ text: 'FLASHCARD SETS', style: { color: white } }}
        />
        {
          data &&
          <FlatList
            data={data}
            renderItem={({item}) => 
              <Card>
                <Text style={styles.headText}>{item.setName}</Text>
                <Text style={styles.subText}>{`${item.flashcards.length} Flashcards`}</Text>
              </Card>
            }
            keyExtractor={this._keyExtractor}
          />
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
  }
})

const mapStateToProps = state => ({
  sets: state
});


export default connect(mapStateToProps)(MyFlashcardSets);