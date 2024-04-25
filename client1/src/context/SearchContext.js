//USE OF REACT CONTEXT API
//in this project we use react context because we pass the date range from home page to Hotel.jsx page
import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }
}

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

export const SearchContext = createContext(INITIAL_STATE)
//createContext returns a context object. The context object itself does not hold any information. It represents which context other components read or provide.

//here we write our actions

//then we create our reducer
// reducer takes previous state and an action. Then they reduce it (read it return) to one entity: the new updated instance of state. So reducers are basically pure JS functions which take in the previous state and an action and return the newly updated state.
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        //when we dispatch the NEW_SEARCH we should return any payload because it is going to be our new state
        //basically this payload is destinaton, date range, and options
        //whenever we change our search information in home page we dispatch this above function

        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state;
    }
}

//then use SearchrReducer in context
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider> //inside this SearchContext.Provider we wrap our children and inside the value we write what we want to pass
        //we pass dispatch beacuse when we update our searchbar we call this NEW_search actions
    )
}
//this children will be the components which we want to reach the INITIAL_STATE data
//The useReducer Hook is used to store and update states, just like the useState Hook. It accepts a reducer function as its first parameter and the initial state as the second. useReducer returns an array that holds the current state value and a dispatch function to which you can pass an action and later invoke it.
