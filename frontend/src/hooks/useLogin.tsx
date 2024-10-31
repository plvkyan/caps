import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const { toast } = useToast();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (blkLt: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blkLt, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            // Show success toast
            toast({
                title: "You've logged in successfully.",
                description: `Welcome, ${blkLt}.`,
            });

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
