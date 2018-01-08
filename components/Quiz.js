import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, red, black, green } from '../utils/colors'
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    correctBtn: {
        backgroundColor: green,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    incorrectBtn: {
        backgroundColor: red,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
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