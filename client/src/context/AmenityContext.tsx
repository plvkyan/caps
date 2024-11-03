


import { createContext, useReducer } from 'react';


export const AmenitiesContext = createContext<any>({})




export const amenitiesReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_AMENITIES':
            return {
                amenities: action.payload
            }
        case 'CREATE_AMENITY':
            return {
                amenities: [action.payload, ...state.amenities]
            }
        case 'UPDATE_AMENITY':
            return {
                amenities: [action.payload, ...state.amenities]
            }
        case 'DELETE_AMENITY':
            return {
                amenities: state.amenities.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }



}


export const AmenitiesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(amenitiesReducer, {
        amenities: null
    })



    return (
        <AmenitiesContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AmenitiesContext.Provider>
    )
}