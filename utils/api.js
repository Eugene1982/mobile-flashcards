import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './constants'
import { formatResults } from './_decks'

export function getDecks() {
   return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults)
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

export function addCardToDeck({ title, card }) {
    /*  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
          [key]: entry
      }))*/
}
