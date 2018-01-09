import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import MainNavigator from './MainNavigator'
import { Constants } from 'expo'
import { grey } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={grey} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}