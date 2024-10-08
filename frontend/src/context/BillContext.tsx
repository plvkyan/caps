


import { createContext, useReducer } from 'react';


export const BillsContext = createContext<any>({})




export const billsReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_BILLS':
            return {
                bills: action.payload
            }
        case 'CREATE_BILL':
            return {
                bills: [action.payload, ...state.bills]
            }
        case 'UPDATE_BILL':
            return {
                bills: [action.payload, ...state.bills]
            }
        case 'DELETE_BILL':
            return {
                bills: state.bills.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }



}


export const BillsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer( billsReducer, {
        bills: null
    })



    return (
        <BillsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </BillsContext.Provider>
    )
}