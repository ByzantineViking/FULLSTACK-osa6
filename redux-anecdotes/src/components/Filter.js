import React, { useRef } from 'react'
import { filterAnecdotes, cacheAnecdotes, clearAnecdotes, clearCache, restoreAnecdote } from '../reducers/subreducers'
const Filter = ({store}) => {
    const textInput = useRef()

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        // empty filter falsy
        const cache = store.getState().cache
        if(!event.target.value) {
            // Reset
            store.dispatch(clearAnecdotes())
            cache.forEach(anecdote => 
                store.dispatch(restoreAnecdote(anecdote)))
            store.dispatch(clearCache())
        } else {
            // Filter
            if (cache.length === 0) {
                // If the first letter of filter, we cache anecdotes
                store.dispatch(cacheAnecdotes(store.getState().anecdotes))
            }
            store.dispatch(filterAnecdotes(event.target.value))
        }
    }
    const resetButton = () => {
        const cache = store.getState().cache
        store.dispatch(clearAnecdotes())
        cache.forEach(anecdote =>
            store.dispatch(restoreAnecdote(anecdote)))
        store.dispatch(clearCache())
        textInput.current.value = ''
    }
    const style = {
        marginBottom: 5,
        display: 'inline'
    }
    
    return (
        <div>
            <div style={style}>
                filter <input onChange={handleChange} ref={textInput}/>
            </div>
            <button onClick={resetButton}>clear</button>
        </div>
    )
}

export default Filter
