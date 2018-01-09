import { StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import { white, purple, grey, black } from './utils/colors'

export default StackNavigator({
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
  