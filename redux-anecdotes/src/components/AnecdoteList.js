import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {

    const anecdotes = store.getState()
    return (
        <ul>
        {
            anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <li key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => store.dispatch(vote(anecdote.id))}>vote</button>
                        </div>
                    </li>
                )
                
        }
        </ul>
    )
}


export default AnecdoteForm
