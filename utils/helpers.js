import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'mobile-flashcards:notifications'

export function getCountInfo(deck) {
    console.log(deck)
    return {
        title: deck.title,
        questionsCount: deck.questions ? deck.questions.length: 0
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Quiz reminder!',
        body: "Don't forget to complete your quiz!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let reminderDate = new Date()
                            reminderDate.setMinutes(reminderDate.getMinutes() + 5)
                         
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: reminderDate,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}