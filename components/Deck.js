import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class Deck extends Component {
   
    render() {
        const { deck } = this.props
        console.log(this.props)
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


function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params
  
    return {
     deck
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