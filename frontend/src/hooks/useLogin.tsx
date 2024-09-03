


import { useState } from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useToast } from '@/components/ui/use-toast'






export const useLogin = () => {

    const { toast } = useToast()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const { dispatch } = useAuthContext()

    const login = async (blkLt, password, role) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ blkLt, password, role })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {

            toast({ 
                title: "You've logged in successfully.",
                description: "Welcome, " + (blkLt) + "."
            },)

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error}

}







