


// Imports
// Utility Imports
// useState React Import
import { useState } from 'react';
// useNavigate Hook Import
import { useNavigate } from 'react-router-dom';



// Custom Hooks Imports
// useAuthContext Hook Import
import { useAuthContext } from '@/hooks/useAuthContext';

const API_URL = process.env.REACT_APP_API_URL;



export const useLogin = () => {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (userBlkLt: string, userPassword: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL + '/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userBlkLt, userPassword }),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            // Navigate to the dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
