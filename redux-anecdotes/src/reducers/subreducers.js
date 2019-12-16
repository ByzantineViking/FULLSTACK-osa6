import anecdoteService from '../services/anecdotes'

// Functions to oust the decision of reducer case out of other components 
export const vote = (anecdote) => {
  // redux-thunk
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(anecdote)
    // Update the view
    dispatch({
      type: 'VOTE',
      data: {
        id: newAnecdote.id
      }
    })
    const anecdotes = await anecdoteService.getAll()
    const votedOnAnecdotes = anecdotes.map(a => {
      if (a.id === newAnecdote.id) {
        return newAnecdote
      } else {
        return a
      }
    })
    /* Here we update the voted on item in cache to be correct,
       so that when we return the cache aka remove the filter
       the votes on that anecdote stay. */
    dispatch({
      type: 'CACHE',
      data: {
        anecdotes: votedOnAnecdotes
      }
    })
  } 
}
export const createAnecdote = (content) => {
  // redux-thunk
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}
export const initializeAnecdotes = () => {
  // redux-thunk
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
export const setMessage = (message, time) => {
  // redux-thunk
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message
      }
    })
    setTimeout( () => {
      dispatch({
        type: 'HIDE_MESSAGE'
      })
    }, time)
  }
}
export const restoreAnecdote = (anecdote) => {
  return {
    type: 'RESTORED_ANECDOTE',
    data: anecdote
  }
}
export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER',
    data: {
      filter
    }
  }
}
export const cacheAnecdotes = (anecdotes) => {
  return {
    type: 'CACHE',
    data: {
      anecdotes
    }
  }
}
export const clearCache = () => {
  return {
    type: 'CLEAR_CACHE'
  }
}
export const clearAnecdotes = () => {
  return {
    type: 'CLEAR'
  }
}
export const toggleButton = (boolean) => {
  return {
    type: 'TOGGLE_BUTTON',
    data: {
      current: boolean
    }
  }
}

const initialState = {
  anecdotes: [],
  notification: '',
  cache: [],
  button: true
}

// Under are the reducers

export const notificationReducer = (state = initialState.notification, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.data.message
    case 'HIDE_MESSAGE':
      return ''
    default:
      return state
  }
}

export const voteReducer = (state = 0, action) => {
  switch (action.type) {
    case 'VOTE':
      // Getting the id from the data field
      const id = action.data.id
      const target = state.find(a => a.id === id)
      const changed = {
        ...target,
        votes: target.votes + 1
      }
      // Only replace the one that has been changed
      return state.map(a =>
        a.id !== id ? a : changed
      )
    default:
      return state
  }
}
export const cacheReducer = (state = initialState.cache,  action) => {
  switch(action.type) {
    case 'CACHE':
      return action.data.anecdotes
    case 'CLEAR_CACHE':
      return []
    default:
      return state
  }
}
export const buttonReducer = (state = initialState.button, action) => {
  switch(action.type) {
    case 'TOGGLE_BUTTON':
      return !action.data.current
    default:
      return state
  }
}
export const listReducer = (state = initialState.anecdotes, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    case 'RESTORED_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE':
      return voteReducer(state, action)
    case 'FILTER':
      const filter = action.data.filter
      const holder = state.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return holder
    case 'CLEAR':
      return []
    default:
      return state
  }
}




