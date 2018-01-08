import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, gray } from '../utils/colors'


class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params
    
        return {
          title: `${deckName}`
        }
      }
    openAddCard = () => {
        const { deck} = this.props
        this.props.navigation.navigate(
            'AddCard',
            { deckName: deck.title }
        )
    }

    render() {
        const { deck, count } = this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Text>{deck.title}</Text>
                <Text style={{ fontSize: 16, color: gray }}>{count}</Text>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.openAddCard}>
                    <Text style={styles.submitBtnText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.startQuiz}>
                    <Text style={styles.submitBtnText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    deck: {
        /*flexDirection: 'row',*/
        marginTop: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
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

function mapDispatchToProps(dispatch, { navigation }) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Deck)