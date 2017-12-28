import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { getCountInfo } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        console.log("mount")
        getDecks()
            .then((decks) => dispatch(recieveDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })))
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
                {Object.keys(decks).map(deck => {
                    const { title, questionsCount } = getCountInfo(decks[deck])
                    return (
                        <View style={styles.deck} key={deck}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(
                                    'Deck',
                                    { deck: key }
                                )}>
                                <Text style={{ fontSize: 20 }}>
                                    {title}
                                </Text>
                                <Text style={{ fontSize: 16, color: gray }}>
                                    {questionsCount} cards
                            </Text>
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
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps
)(DeckList)