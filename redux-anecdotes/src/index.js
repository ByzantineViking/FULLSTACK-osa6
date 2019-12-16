import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import { listReducer, notificationReducer, cacheReducer, buttonReducer } from './reducers/subreducers'

const reducer = combineReducers({
  anecdotes: listReducer,
  notification: notificationReducer,
  cache: cacheReducer,
  button: buttonReducer
})
// The store is defined here at the starting point
const store = createStore(reducer)
//store.subscribe(() => console.log(store.getState()))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)