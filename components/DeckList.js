import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { getCountInfo } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions'
import { connect } from 'react-redux'
import { white, purple, gray } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        /* const decks = getDecks()
         console.log(decks)
       
         dispatch(recieveDecks(decks))
         this.setState(() => ({ ready: true }))*/

        getDecks()
            .then((decks) => dispatch(recieveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    openAddDeck = () => {
        this.props.navigation.navigate('AddDeck')
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                <Text>DECKS</Text>
                {Object.keys(decks).map(deckName => {
                    const { title, questionsCount } = getCountInfo(decks[deckName])
                    return (
                        <View style={styles.deck} key={deckName}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(
                                    'Deck',
                                    { deckName: deckName, count: questionsCount }
                                )}>
                                <Text style={{ fontSize: 20 }}>
                                    {title}
                                </Text>
                                <Text style={{ fontSize: 16, color: gray }}>
                                    {questionsCount} cards
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                                onPress={this.openAddDeck}>
                                <Text style={styles.submitBtnText}>Add Deck</Text>
                            </TouchableOpacity>
                        </View>
                    )

                })}
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

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps
)(DeckList)