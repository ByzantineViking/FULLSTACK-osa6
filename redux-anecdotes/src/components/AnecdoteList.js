import React from 'react'
import { connect } from 'react-redux'
import { vote, hideMessage, setMessage } from '../reducers/subreducers'

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
                            <button onClick={() => {
                                props.vote(anecdote.id)
                                props.setMessage(`You voted '${anecdote.content}'`)
                                setTimeout( () => {
                                    props.hideMessage()   
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),
    }
}
// This way is useful if dispatched actions need to reference the props of the component.
const mapDispatchToProps = dispatch => {
    return {
        hideMessage: value => {
            dispatch(hideMessage(value))
        },
        setMessage: value => {
            dispatch(setMessage(value))
        },
        vote: value => {
            dispatch(vote(value))
        },
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
