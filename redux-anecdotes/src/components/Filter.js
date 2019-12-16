import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes, cacheAnecdotes, clearAnecdotes, clearCache, restoreAnecdote, toggleButton } from '../reducers/subreducers'

const Filter = (props) => {
    const inputRef = useRef()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        // empty filter falsy
        const cache = props.cache
        if(!event.target.value) {
            props.toggleButton(props.button)
            // Reset
            props.clearAnecdotes()
            cache.forEach(anecdote => props.restoreAnecdote(anecdote))
            props.clearCache()
        } else {
            // Filter
            if(props.button) {
                props.toggleButton(props.button)
            }
            if (cache.length === 0) {
                // If the first letter of filter, we cache anecdotes
                props.cacheAnecdotes(props.anecdotes)
            }
            props.filterAnecdotes(event.target.value)
        }
    }
    const resetButton = () => {
        props.toggleButton(props.button)
        const cache = props.cache
        props.clearAnecdotes()
        cache.forEach(anecdote => props.restoreAnecdote(anecdote))
        props.clearCache()
        inputRef.current.value = ''
    }
    const style = {
        marginBottom: 5,
        display: 'inline'
    }
    return (
        <div>
            <div style={style}>
                filter <input onChange={handleChange} ref={inputRef}/>
            </div>
            <button onClick={resetButton} disabled={props.button}>clear</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        cache: state.cache,
        button: state.button
    }
}
const mapDispatchToProps = {
    filterAnecdotes,
    cacheAnecdotes,
    clearAnecdotes,
    clearCache,
    restoreAnecdote,
    toggleButton
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
