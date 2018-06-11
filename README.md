# Udaciflashcards

Udaciflashcards, the final assessment project for Udacity's React course, is an IOS app created with React Native. Users can use the app to study sets of flashcards. Key functionalities of the app include allowing users to create their own decks, add flashcards to a deck, and quiz themselves on the flashcards in a deck.

Udaciflashcards currently does not have support for Android.

## Start Developing

After cloning the repository, to get started developing:

* Install the dependencies
    - `cd udaciflashcards`
    - `yarn install`
* Boot up the app in Expo and run on the IOS simulator or IOS device
    - `yarn start`
    - `i` to open the IOS simulator or scan the QR code to open the app on your IOS device through the expo app
    
## Local Notifications

This app allows for users to receive local notifications if they have granted the app authorization.
* In the IOS simulator, the returned authorization will be 'undetermined'. To test the notifications are working in this environment:
    - go to `utils/helpers.js`
    - on line 46, change `if (status === 'granted')` to `if (status === 'undetermined')`

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).
