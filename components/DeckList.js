import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { getCountInfo } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions'
import { connect } from 'react-redux'
import { gray } from '../utils/colors'
import { AppLoading } from 'expo'
import styles from './styles/DeckList';

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => this.props.recieveDecks(decks))
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
                <KeyboardAvoidingView>
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
                </KeyboardAvoidingView>
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps,
    { recieveDecks }
)(DeckList)