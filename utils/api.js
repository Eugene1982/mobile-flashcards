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
    /*  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
          [key]: entry
      }))*/

      /*
      AsyncStorage.getItem( 'user' )
    .then( data => {

      // the string value read from AsyncStorage has been assigned to data
      console.log( data );

      // transform it back to an object
      data = JSON.parse( data );
      console.log( data );

      // Decrement
      data.question_count--;
      console.log( data );

      //save the value to AsyncStorage again
      AsyncStorage.setItem( 'user', JSON.stringify( data ) );

    }).done();
      */
}
