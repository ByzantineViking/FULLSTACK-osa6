import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/subreducers'


const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
      // eslint-disable-next-line
  },[])

  return (
    <div>
      <h2>Programming Anecdotes</h2>
      <Filter/>
      <AnecdoteForm/>
      <AnecdoteList/>
      <Notification/>
    </div>
  )
}
export default connect(null, { initializeAnecdotes })(App)