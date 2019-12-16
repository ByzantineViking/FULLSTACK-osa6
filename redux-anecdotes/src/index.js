import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'

import { listReducer, notificationReducer, cacheReducer } from './reducers/subreducers'

const reducer = combineReducers({
  anecdotes: listReducer,
  notification: notificationReducer,
  cache: cacheReducer
})
// The store is defined here at the starting point
const store = createStore(reducer)
//store.subscribe(() => console.log(store.getState()))

const render = () => {
  ReactDOM.render(
    //<div></div>,
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)