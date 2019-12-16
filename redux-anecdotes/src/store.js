
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { 
    listReducer, 
    notificationReducer, 
    cacheReducer, 
    buttonReducer
} from './reducers/subreducers'




const reducer = combineReducers({
    anecdotes: listReducer,
    notification: notificationReducer,
    cache: cacheReducer,
    button: buttonReducer
})
// The store is defined here at the starting point
const store = createStore(reducer, applyMiddleware(thunk))
//store.subscribe(() => console.log(store.getState()))

export default store