export function getCountInfo(deck) {
    return {
        title: deck.title,
        questionsCount: deck.questions ? deck.questions.length: 0
    }
}