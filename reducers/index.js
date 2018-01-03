import { RECEIVE_DECKS } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        default:
            return state
    }
}

function cards(state = [], action){
    switch (action.type) {
        case ADD_CARD:
            return {
               
            }
        default:
            return state
    }  
}

export default decks