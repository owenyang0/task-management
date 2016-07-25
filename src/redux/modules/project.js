export const PROJECT_ADDED = 'PROJECT_ADDED'
export const PROJECT_SWITCH = 'PROJECT_SWITCH'

export function newProject (proj) {
  return {
    type: PROJECT_ADDED,
    payload: proj
  }
}

export function switchProject (payload) {
  return {
    type: PROJECT_SWITCH,
    payload: payload
  }
}

export const actions = {
  newProject,
  switchProject
}

const ACTION_HANDLERS = {
  [PROJECT_ADDED]: (state, action) => {
    if (!state['todo']) state['todo'] = { projects: []}
    state['todo'].projects.push(action.payload)

    return state
  },
  [PROJECT_SWITCH]: (state, action) => {
    const { changedItem, preType, currType } = action.payload
    const idx = state[preType].projects.indexOf(changedItem)

    idx !== -1 && state[preType].projects.splice(idx, 1)
    state[currType].projects.push(changedItem)

    return state
  }
}


const projectData = JSON.parse(localStorage.getItem('projects'))

const initialState = projectData || {
  todo: {
    title: 'TO DO',
    projects: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']
  },
  progress: {
    title: 'IN PROGRESS',
    projects: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
  },
  done: {
    title: 'DONE',
    projects: ['Project 1', 'Project 2', 'Project 3', 'Project 4']
  }
}

export default function projectReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  const newState = handler ? handler(state, action) : state

  localStorage.setItem('projects', JSON.stringify(newState))
  return newState
}
