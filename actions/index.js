import {RECEIVE_DECKS, ADD_CARD, ADD_DECK} from './types';

export function recieveDecks(decks){
    return{
        type: RECEIVE_DECKS,
        decks
    }
}

export function addNewCard(deck, card){
    return{
        type: ADD_CARD,
        deck,
        card
    }
}

export function addNewDeck(deckTitle){
    return{
        type: ADD_DECK,
        deckTitle
    }
}
