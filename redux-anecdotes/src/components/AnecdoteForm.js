import React from 'react'
import { createAnecdote, setMessage, hideMessage } from '../reducers/subreducers'



const AnecdoteForm = ({store}) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        // As the form is uncontrolled, here we pull the form value
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        store.dispatch(
            createAnecdote(content)
        )
        store.dispatch(
            setMessage(`You created ${content}`)
        )
        setTimeout( () => {
            store.dispatch(hideMessage())
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

export default AnecdoteForm
    