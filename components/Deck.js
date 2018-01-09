import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'
import { connect } from 'react-redux'
import styles from './styles/Deck'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'


class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params

        return {
            title: `${deckName}`
        }
    }

    openAddCard = () => {
        const { deck } = this.props
        this.props.navigation.navigate(
            'AddCard',
            { deckName: deck.title }
        )
    }

    startQuiz = () => {
        const { deck } = this.props
        clearLocalNotification().then(setLocalNotification)
        this.props.navigation.navigate(
            'Quiz',
            { deckName: deck.title }
        )
    }

    redirectToList = () => {
        this.props.navigation.navigate(
            'DeckList'
        )  
    }

    render() {
        const { deck, count } = this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.deck}>
                    <Text style={{ fontSize: 20, padding: 10 }}>{deck.title}</Text>
                    <Text style={{ fontSize: 16, color: gray, padding: 10 }}>{count} card(s)</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.submitBtn} onPress={this.openAddCard}>
                            <Text style={styles.submitBtnText}>Add Card</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons}>
                        {deck.questions.length > 0 && <TouchableOpacity
                            style={styles.quizBtn} onPress={this.startQuiz}>
                            <Text style={styles.quizBtnText}>Start Quiz</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.submitBtn} onPress={this.redirectToList}>
                            <Text style={styles.submitBtnText}>Back to list</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}



function mapStateToProps(decks, { navigation }) {
    const { deckName, count } = navigation.state.params

    return {
        deck: decks[deckName],
        count
    }
}

export default connect(
    mapStateToProps
)(Deck)