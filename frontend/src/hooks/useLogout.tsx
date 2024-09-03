


import { useAuthContext } from '@/hooks/useAuthContext';



export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user')


        // Dispatch Logout Action
        dispatch({ type: 'LOGOUT'})
    }

    return { logout }

}