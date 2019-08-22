import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './theme/reducer' //Import from reducer

//Connect our store to teh reducers
export default createStore(reducers, applyMiddleware(thunk))