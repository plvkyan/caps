


import { createContext, useReducer } from 'react';


export const ReservationsContext = createContext<any>({})




export const reservationsReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_RESERVATIONS':
            return {
                reservations: action.payload
            }
        case 'CREATE_RESERVATIONS':
            return {
                reservations: [action.payload, ...state.users]
            }
        case 'UPDATE_RESERVATIONS':
            return {
                reservations: state.users
            }
        case 'DELETE_RESERVATIONS':
            return {
                reservations: state.users.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }



}


export const ReservationsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reservationsReducer, {
        reservations: null
    })



    return (
        <ReservationsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </ReservationsContext.Provider>
    )
}