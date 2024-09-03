


import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useUsersContext } from './useUsersContext'






export const useSignup = () => {

    const { toast } = useToast()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const { users, dispatch } = useUsersContext()

    const signup = async (blkLt, password, role, position, stat) => {
        
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ blkLt, password, role, position, stat }, null, 2),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            toast({ 
                title: "Account Creation Failed",
                description: json.error
            },)

        }

        if (response.ok) {

            toast({ 
                title: "Account Created Succesfully",
                description: (blkLt) + " was added to the database."
            },)

            dispatch({ type: "CREATE_USER", payload: json })
            console.log(users)


            setIsLoading(false)
        }
    }

    return { signup, isLoading, error}

}