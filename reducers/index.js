import { RECEIVE_DECKS, ADD_CARD, ADD_DECK } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_CARD:
            const { title } = action.deck
            state[title].questions.push(action.card)
        case ADD_DECK:
            let deck = {
                [action.deckTitle] : 
                { 
                    title: action.deckTitle, 
                    questions: [] 
                }
            }

            return {
                ...state,
                ...deck,
            }
        default:
            return state
    }
}

export default decks