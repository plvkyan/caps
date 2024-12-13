


// Imports
// Utility Imports
// React Imports
import { useState } from 'react'



// Context Imports
import { useUsersContext } from './useUsersContext'



// API Call Imports
import { createUser } from '@/data/user-api'



// 
export const useSignup = () => {

    // States
    // Error State
    const [error, setError] = useState<String | null>(null);
    // Loading State
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    // Dispatch
    const { dispatch } = useUsersContext();



    // Functions
    // Signup Function
    const signup = async (userBlkLt: String, userPassword: String, userEmail: String, userMobileNo: String, userRole: String, userPosition: String, userStatus: String, userCreatorId: String, userCreatorBlkLt: String, userCreatorPosition: String, userVisibility: String) => {
        
        // Set Loading to true
        setIsLoading(true);
        // Set Error to null
        setError(null);

        try {
            // Create User
            const response = await createUser(userBlkLt, userPassword, userEmail, userMobileNo, userRole, userPosition, userStatus, userCreatorId, userCreatorBlkLt, userCreatorPosition, userVisibility);
            // Get JSON
            const json = await response.json();

            // Check if response is not ok
            if (!response.ok) {
                throw new Error(json.error);
            }

            // Dispatch
            dispatch({ type: "CREATE_USER", payload: json });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
