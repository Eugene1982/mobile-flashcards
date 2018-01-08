import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, gray, red } from '../utils/colors'
import { YES_ANSWER, NO_ANSWER } from '../utils/constants'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    state = {
        correctAnswers: 0,
        currentIndex: 0,
        percentage: undefined,
        questionMode: true
    }

    nextQuestion = () => {
        const { currentIndex } = this.state
        const { questions } = this.props
        if (currentIndex < questions.length - 1) {
            this.setState(() => {
                return {
                    currentIndex: currentIndex + 1,
                    questionMode: true
                }
            })
        } else {
            const { correctAnswers } = this.state
            let percentage = ((questions.length - (questions.length - correctAnswers)) / questions.length) * 100.0
            this.setState({percentage})
        }
    }

    check = (answer, option) => {
        const { correctAnswers } = this.state
        if (answer === option) {
            this.setState({ correctAnswers: correctAnswers + 1 })
        }
        this.nextQuestion()
    }


    render() {
        const { currentIndex, questionMode, percentage } = this.state
        const question = this.props.questions[currentIndex]
        return (
            <View>
                <Text>{currentIndex + 1}/{this.props.questions.length}</Text>
                <Text>{questionMode ? question.question : question.answer}</Text>
                <TouchableOpacity
                    onPress={() => this.setState({ questionMode: !questionMode })}>
                    <Text style={{ fontSize: 20, color: red }}>
                        {questionMode ? "Answer" : "Question"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.check(question.answer, YES_ANSWER)}>
                    <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={() => this.check(question.answer, NO_ANSWER)}>
                    <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
                {percentage !== undefined && <Text style={{ fontSize: 20 }}>
                    {"Correct answers: " + percentage + "%"}
                </Text>}
            </View>
        )
    }
}


function mapStateToProps(decks, { navigation }) {
    const { deckName } = navigation.state.params

    return {
        questions: decks[deckName].questions
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
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

export default connect(
    mapStateToProps
)(Quiz)