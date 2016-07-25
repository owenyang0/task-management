import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import project from './modules/project'

export default combineReducers({
  project,
  router
})
