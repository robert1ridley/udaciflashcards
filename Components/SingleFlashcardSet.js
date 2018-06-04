import React from 'react';
import { View, Text } from 'react-native';

class SingleFlashcardSet extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId');
    return (
      <View>
        <Text>SingleFlashcardSet</Text>
      </View>
    )
  }
}

export default SingleFlashcardSet;