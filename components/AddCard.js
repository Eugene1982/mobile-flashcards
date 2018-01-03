import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {

    state = {
        questionText: 'Write your question',
        answerText: 'Write your answer'
    }

    resetState = () => {
        this.setState(() => ({ questionText: 'Write your question', answerText: 'Write your answer' }))
    }

    submit = () => {
        const deckName = this.props.deck
    
        this.props.dispatch(addEntry({
          [key]: entry
        }))
    
        this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))
    
        this.toHome()
    
        submitEntry({ key, entry })
    
        clearLocalNotification()
          .then(setLocalNotification)
    }

    handleQuestionTextChange = (text) => {
        this.setState(() => { questionText: text })
    }

    handleAnswerTextChange = (text) => {
        this.setState(() => { answerText: text })
    }

    render() {
        const { questionText, answerText } = this.state
        return (
            <View style={styles.container}>
                <Text>Add new card</Text>
                <TextInput autoFocus={true} value={questionText} onChangeText={this.handleQuestionTextChange}></TextInput>
                <TextInput value={answerText} onChangeText={this.handleAnswerTextChange}></TextInput>
                <SubmitBtn onPress={this.submit} />
            </View>)
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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

function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params

    return {
        deck
    }
}


export default connect(
    mapStateToProps
)(AddCard)