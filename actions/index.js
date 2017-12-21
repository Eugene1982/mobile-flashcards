export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function recieveDecks(decks){
    return{
        type: RECEIVE_DECKS,
        decks
    }
}