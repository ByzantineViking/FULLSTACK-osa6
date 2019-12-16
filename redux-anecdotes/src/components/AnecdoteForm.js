import React from 'react'
// These are used just to give them to connect
import { createAnecdote, setMessage, hideMessage } from '../reducers/subreducers'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        // As the form is uncontrolled, here we pull the form value
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setMessage(`You created ${content}`)
        setTimeout( () => {
            props.hideMessage()
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2 >
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
// Under is short-hand for constructing js object with createAnecdote: createAnecdote ...
export default connect(null, { createAnecdote, setMessage, hideMessage })(AnecdoteForm)
    