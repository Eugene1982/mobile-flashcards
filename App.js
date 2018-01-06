import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import reducer from './reducers'
import { white, purple, grey } from './utils/colors'


const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Deck: {
    screen: Deck, 
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard, 
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddDeck: {
    screen: AddDeck, 
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
        <MainNavigator />
        </View>
      </Provider>
    );
  }
}