import { createStore } from 'redux'

const INITIAL_STATE={
    patient:[]
}

function patients (state=INITIAL_STATE, action){
    
    switch (action.type) {
        case 'ADD_PATIENT':
          return {
            ...state,
            patient:action.patient
          }
        
    
        case 'DELETE_PATIENT':
          return INITIAL_STATE;
    
        default:
          return state;
      }
}

const store = createStore(patients)

export default store