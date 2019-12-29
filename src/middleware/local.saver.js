export const save_state_locally = store => next => action => {
    next(action)
    localStorage.setItem("weatherApp", JSON.stringify(store.getState()) )
    return 
} 
  
export const get_local_state = ()=> JSON.parse(localStorage.getItem("weatherApp")) || {}