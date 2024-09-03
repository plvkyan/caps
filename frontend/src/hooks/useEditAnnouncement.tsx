


import { useState } from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useToast } from '@/components/ui/use-toast'
import { useAnnouncementsContext } from '@/hooks/useAnnouncementsContext'






export const useEditAnnouncement = () => {

    const { toast } = useToast()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<any | null>(null)
    const { announcements, dispatch } = useAnnouncementsContext()

    const editAnnouncement = async (_id, content, badges, stat) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/announcements/editAnnouncement' + _id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content, badges, stat })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {

            toast({ 
                title: "Announcement Edited Succesfully",
                description: ""
            },)

            dispatch({ type: 'UPDATE_ANNOUNCEMENT', payload: json})

            setIsLoading(false)
        }
    }

    return { editAnnouncement, isLoading, error}

}