import React from 'react';
import { View, Text } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/lib/integration/react'
//store

//Components
import Login from './components/Login'
import Register from './components/Register'
import Schedules from './components/Schedules'
import AddSchedule from './components/AddSchedule'
import Checklist from './components/Checklist'
import Home from './components/Home'
import About from './components/About'



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Scene headerMode="none">
              <Scene key="login" component={Login} initial />
              <Scene key="register" component={Register} />
              <Scene key="schedules" component={Schedules} />
              <Scene key="addSchedule" component={AddSchedule} />
              <Scene key="checklist" component={Checklist} />
              <Scene key="about" component={About} />
              <Scene key="home" component={Home} />
            </Scene>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}