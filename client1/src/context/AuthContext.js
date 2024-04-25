//USE OF REACT CONTEXT API
//in this project we use react context because we pass the date range from home page to Hotel.jsx page
import { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

export const AuthContext = createContext(INITIAL_STATE)
//createContext returns a context object. The context object itself does not hold any information. It represents which context other components read or provide.

//here we write our actions

//then we create our reducer
// reducer takes previous state and an action. Then they reduce it (read it return) to one entity: the new updated instance of state. So reducers are basically pure JS functions which take in the previous state and an action and return the newly updated state.
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

//then use SearchrReducer in context
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    //when we login we just save the user into local storage, in this case if we refresh the page we are not going to be logged out.
    //to do that we are using useEffect()

    //The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional. The function passed to useEffect is a callback function. This will be called after the component renders. 

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user)) //user can not be stored in localstorage because it is an object  so it should be string
    }, [state.user])
    //we use state.user because whenever it changes we are going to update our local storage

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider> //inside this SearchContext.Provider we wrap our children and inside the value we write what we want to pass
        //we pass dispatch beacuse when we update our searchbar we call this NEW_search actions
    )
}
//this children will be the components which we want to reach the INITIAL_STATE data
//The useReducer Hook is used to store and update states, just like the useState Hook. It accepts a reducer function as its first parameter and the initial state as the second. useReducer returns an array that holds the current state value and a dispatch function to which you can pass an action and later invoke it.
