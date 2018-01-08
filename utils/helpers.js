export function getCountInfo(deck) {
    console.log(deck)
    return {
        title: deck.title,
        questionsCount: deck.questions ? deck.questions.length: 0
    }
}