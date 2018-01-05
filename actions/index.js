export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

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
