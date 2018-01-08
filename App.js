import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import reducer from './reducers'
import { white, purple, grey, black } from './utils/colors'


const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Deck: {
    screen: Deck, 
    navigationOptions: {
      headerTintColor: grey,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  AddCard: {
    screen: AddCard, 
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: grey,
      }
    }
  },
  AddDeck: {
    screen: AddDeck, 
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: grey,
      }
    }
  },
  Quiz: {
    screen: Quiz, 
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: grey,
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