import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { getCountInfo } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions'
import { connect } from 'react-redux'
import { white, gray, yellow, black } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

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
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.openAddDeck}>
                    <Text style={styles.submitBtnText}>Add Deck</Text>
                </TouchableOpacity>
                <Text style={{ padding: 15 }}>DECKS</Text>
                <View
                    style={{
                        borderBottomColor: 'yellow',
                        borderBottomWidth: 2,
                    }}
                />
                <ScrollView>
                    {Object.keys(decks).map(deckName => {
                        const { title, questionsCount } = getCountInfo(decks[deckName])
                        return (
                            <View key={deckName}>
                                <View style={styles.deck}>
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
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                />
                            </View>
                        )

                    })}
                </ScrollView>

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
        alignItems: 'center',
        marginTop: 1,
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
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
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