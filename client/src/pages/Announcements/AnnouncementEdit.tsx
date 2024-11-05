


// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Dialog Component Import
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// shadcn Form Component Import
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast";



// Other UI Components Imports
// MultipleSelectorCreatable Import
import MultipleSelector, { Option } from '@/components/custom/MultipleSelector';



// Hooks Imports
// Announcements Hook Import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext"

// Authentication Hook Import



// Utility Imports
// React Everything Import
import * as React from 'react';

// Zod Everything Import
import * as zod from "zod";

// Use From from React Hook Form Import
import { useForm } from "react-hook-form";

// ZodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";





const OPTIONS: Option[] = [
    { label: 'Important', value: 'important' },
    { label: 'Statements', value: 'statements' },
    { label: 'Utility', value: 'utility' },
    { label: 'Missing', value: 'missing' },
    { label: 'Lost', value: 'lost' },
    { label: 'Found', value: 'found' },
]





const optionSchema = zod.object({
    label: zod.string(),
    value: zod.string(),
});

const formSchema = zod.object({

    content: zod.string().min(1,
        { message: "Announcement content cannot be empty." }
    ).min(1),
    badges: zod.array(optionSchema).min(1,
        { message: "Please pick at least one tag." }
    ),

});





const AnnouncementEdit = ({ announcement, showEditDialog, setShowEditDialog }) => {

    const { dispatch } = useAnnouncementsContext()
    const { toast } = useToast();



    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: (announcement.content),
            badges: (announcement.badges),
        }
    })





    const { reset } = form;
    const { isSubmitting, isSubmitSuccessful } = form.formState;

    console.log(isSubmitting);

    React.useEffect(() => {
        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])




    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        const response = await fetch(import.meta.env.VITE_API_URL + '/announcements/' + announcement._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }

        // Conditional statement if announcement creation is successful
        if (response.ok) {

            toast({
                title: "Announcement edited successfully.",
                description: ""
            },)

            dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
            window.location.reload()

        }

    }





    return (



        <Form {...form}>
            
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>

                <DialogContent className="sm:max-w-[600px]">


                    <form id="editAnnouncementForm" onSubmit={form.handleSubmit(handleSubmit)}>

                        <DialogHeader className="mt-6">
                            <DialogTitle className="text-center"> Edit announcement </DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>



                        <div className="grid gap-2 py-4">

                            {/* First FormField */}

                            <FormField
                                control={form.control}
                                name="badges"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="flex items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Badges
                                                </FormLabel>

                                                <FormControl>

                                                    <div className="w-full col-span-3">

                                                        <MultipleSelector
                                                            {...field}
                                                            className="bg-black-bg mb-2"
                                                            defaultOptions={OPTIONS}
                                                            placeholder="Please select at least one tag or create a new one by typing."
                                                            creatable
                                                            emptyIndicator={
                                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                                    No results found.
                                                                </p>
                                                            }
                                                        />

                                                    </div>


                                                </FormControl>

                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <div className=""></div>

                                                <div className="col-span-3">

                                                    <FormMessage />

                                                </div>

                                            </div>

                                        </FormItem>

                                    )
                                }}

                            />




                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="flex items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Content
                                                </FormLabel>

                                                <FormControl>

                                                    <Textarea
                                                        id="content"
                                                        className="col-span-3 h-10"
                                                        required
                                                        {...field}
                                                    />

                                                </FormControl>

                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <div className=""></div>

                                                <div className="col-span-3">

                                                    <FormMessage />

                                                </div>

                                            </div>

                                        </FormItem>

                                    )
                                }}

                            />

                        </div>

                        <DialogFooter>

                            <Button type="submit" form="editAnnouncementForm"> Confirm Edit </Button>

                        </DialogFooter>

                    </form>


                </DialogContent>

            </Dialog>

        </Form>



    )





}





export default AnnouncementEdit
