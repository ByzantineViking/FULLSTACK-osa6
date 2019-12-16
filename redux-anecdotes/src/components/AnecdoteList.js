import React from 'react'
import { connect } from 'react-redux'
import { vote, setMessage } from '../reducers/subreducers'

const AnecdoteList = (props) => {
    return (
        <ul>
        {
            props.anecdotes
                .map(anecdote =>
                   
                    <li key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <div style={{display: "inline"}}> votes </div>
                            <button onClick={() => {
                                props.vote(anecdote)
                                props.setMessage(`You voted '${anecdote.content}'`, 5000)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
    }
}
// This way is useful if dispatched actions need to reference the props of the component.
const mapDispatchToProps = dispatch => {
    return {
        setMessage: (value, time) => {
            dispatch(setMessage(value, time))
        },
        vote: value => {
            dispatch(vote(value))
        },
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
