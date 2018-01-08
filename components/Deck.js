import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, gray, black } from '../utils/colors'

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
        this.props.navigation.navigate(
            'Quiz',
            { deckName: deck.title }
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
                   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'center'
    },
    deck: {
        marginTop: 1,
        alignItems: 'center'
    },
    buttons: {
      padding: 10
    },
    submitBtn: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
    },
    quizBtn: {
        backgroundColor: black,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
    quizBtnText: {
        color: purple,
        fontSize: 22,
        textAlign: 'center',
    },
})


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