import React from 'react'
import { vote, hideMessage, setMessage } from '../reducers/subreducers'

const AnecdoteForm = ({store}) => {
    return (
        <ul>
        {
            store.getState().anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <li key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => {
                                store.dispatch(vote(anecdote.id))
                                store.dispatch(setMessage(`You voted '${anecdote.content}'`))
                                setTimeout( () => {
                                    store.dispatch(hideMessage())    
                                }, 5000)
                            }}>
                                    vote
                            </button>
                        </div>
                    </li>
                )
                
        }
        </ul>
    )
}


export default AnecdoteForm
