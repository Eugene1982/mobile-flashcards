import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { YES_ANSWER, NO_ANSWER } from '../utils/constants'
import { red } from '../utils/colors'
import styles from './styles/Quiz';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    state = {
        correctAnswers: 0,
        currentIndex: 0,
        percentage: 0,
        showPercentage: false,
        questionMode: true
    }

    nextQuestion = (currentIndex) => {
        const { questions } = this.props
            this.setState(() => {
                return {
                    currentIndex: currentIndex + 1,
                    questionMode: true
                }
            })
    }

    check = (answer, option) => {
        const { correctAnswers, currentIndex } = this.state
        const { questions } = this.props

        if (answer === option) {
            this.setState({ correctAnswers: correctAnswers + 1 }, () => {
                let percentage = ((questions.length - (questions.length - this.state.correctAnswers)) / questions.length) * 100.0
                this.setState({ percentage })
            })
        }

        if (currentIndex === questions.length - 1) {
           this.setState({ showPercentage: true })
        }
        else {
            this.nextQuestion(currentIndex)
        }
    }

    render() {
        const { currentIndex, questionMode, percentage, showPercentage } = this.state
        const question = this.props.questions[currentIndex]
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20}}>{currentIndex + 1}/{this.props.questions.length}</Text>
                <Text style={{ fontSize: 40}}>{questionMode ? question.question : question.answer}</Text>
                <TouchableOpacity
                    onPress={() => this.setState({ questionMode: !questionMode })}>
                    <Text style={{ fontSize: 20, color: red }}>
                        {questionMode ? "Answer" : "Question"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.correctBtn}
                    onPress={() => this.check(question.answer, YES_ANSWER)}>
                    <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.incorrectBtn}
                    onPress={() => this.check(question.answer, NO_ANSWER)}>
                    <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
                {showPercentage && <Text style={{ fontSize: 20 }}>
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

export default connect(
    mapStateToProps
)(Quiz)