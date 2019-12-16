

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Functions to oust the decision of reducer case out of other components 
export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE'
  }
}
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content
    }
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
export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: {
      message
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
  anecdotes: anecdotesAtStart.map(asObject),
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
      return state.concat(asObject(action.data.content))
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




