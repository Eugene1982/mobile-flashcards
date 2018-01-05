import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './constants'
import { formatResults } from './_decks'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults)
    /*let dummyData = {
      React: {
          title: 'React',
          questions: [
              {
                  question: 'What is React?',
                  answer: 'A library for managing user interfaces'
              },
              {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
              }
          ]
      },
      JavaScript: {
          title: 'JavaScript',
          questions: [
              {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
          ]
      }
  }
  return dummyData*/
}

export function getDeck(deckId) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((items) => items[deckId])
}

export function saveDeckTitle({ title }) {
    /*   return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
           [key]: entry
       }))*/
}

export function addCardToDeck({ deck, card }) {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((items) => {
            items = JSON.parse(items)
            items[deck.title].questions.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(items));
        }).done()
}
