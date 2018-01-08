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

export function saveDeckTitle(title, callbackFunc) {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((items) => {
            items = JSON.parse(items)
            let deck = { title, questions: [] }
            items[title] = deck
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(items));
            callbackFunc(title)
        }).done()
}

export function addCardToDeck({ deck, card }, callbackFunc) {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((items) => {
            items = JSON.parse(items)
            items[deck.title].questions.push(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(items))
            callbackFunc(deck, card)
        }).done()
}
