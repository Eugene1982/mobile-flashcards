export function getCountInfo(deck) {
    return {
        title: deck.title,
        questionsCount: deck.questions.length
    }
}