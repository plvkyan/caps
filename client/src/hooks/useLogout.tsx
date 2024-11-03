


// Imports
// 
import { useAuthContext } from '@/hooks/useAuthContext';




export const useLogout = () => {

    // Dispatch
    const { dispatch } = useAuthContext()



    // Functions
    // Logout Function
    const logout = () => {

        // Remove user from local storage
        localStorage.removeItem('user')

        // Dispatch Logout Action
        dispatch({ type: 'LOGOUT'})
    }

    return { logout }
}