import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { white } from '../utils/colors'

class Deck extends Component {
 
    render() {
        const { deck } = this.props
        
        return (
            <View style={styles.container}>
                <Text>{deck}</Text>
                
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

export default Deck