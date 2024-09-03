


import { createContext, useReducer } from 'react';


export const AnnouncementsContext = createContext<any>({})




export const announcementsReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_ANNOUNCEMENTS':
            return {
                announcements: action.payload
            }
        case 'CREATE_ANNOUNCEMENT':
            return {
                announcements: [action.payload, ...state.announcements]
            }
        case 'UPDATE_ANNOUNCEMENT':
            return {
                announcements: [action.payload, ...state.announcements]
            }
        case 'DELETE_ANNOUNCEMENT':
            return {
                announcements: state.announcements.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }



}


export const AnnouncementsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(announcementsReducer, {
        announcements: null
    })



    return (
        <AnnouncementsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AnnouncementsContext.Provider>
    )
}