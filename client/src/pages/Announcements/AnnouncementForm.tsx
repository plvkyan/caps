


"use client";

// Lucide Icons Import
import {
    SquarePen
} from "lucide-react"



// shadcn Components Import
// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Card Component Import
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from "@/components/ui/card";

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



// Other UI Components Import
// MultipleSelectorCreatable Import
import MultipleSelector, { Option } from '@/components/custom/MultipleSelector';



// Utility
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



// Hooks
// Announcements Hook
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext";

// Authentication Hook
import { useAuthContext } from "@/hooks/useAuthContext"





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

    blkLt: zod.string(
    ).optional(),
    blkLtPosition: zod.string(
    ).optional(),
    content: zod.string().min(1,
        { message: "Announcement content cannot be empty." }
    ),
    badges: zod.array(optionSchema).min(1,
        { message: "Please pick at least one tag." }
    ),

});





const AnnouncementForm = () => {



    // Contexts
    // Announcements Context
    const { dispatch } = useAnnouncementsContext()

    // User Context
    const { user } = useAuthContext()



    // Create Form 
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blkLt: "",
            blkLtPosition: "",
            content: "",
        }
    });

    


    // Handle Submit Function for POSTING an announcement
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        values.blkLt = (user.blkLt);
        values.blkLtPosition = (user.position);

        const response = await fetch('http://localhost:4000/api/announcements', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        // Conditional statement if announcement creation is successful
        if (response.ok) {

            console.log('New announcement created:', json);
            dispatch({ type: 'CREATE_ANNOUNCEMENT', payload: json })
        }
    }





    return (



        <Card>



            <CardHeader className="flex flex-row justify-between border-b px-5">

                <CardTitle className="text-xl">
                    Create Announcement
                </CardTitle>

                <CardDescription>
                    You're posting as: {user.blkLt}
                </CardDescription>

            </CardHeader>



            <Form {...form}>

                <form onSubmit={form.handleSubmit(handleSubmit)}>



                    <CardContent className="border-b p-0">



                        {/* First FormField for Badges */}
                        <FormField
                            control={form.control}
                            name="badges"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="hidden"> Badges </FormLabel>
                                        <FormControl>
                                            <div className="flex border-b flex-row items-center justify-center p-5">
                                                <span className="font-semibold"> Tags </span>
                                                <div className="w-full pl-3 pr-3">
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
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />



                        <div className="p-3">

                            {/* Second FormField for Announcement Content */}
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="hidden"> Content </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="bg-card border-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                                    placeholder="Type your announcement here ..."
                                                    {...field}></Textarea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                        </div>



                    </CardContent>



                    <CardFooter className="p-5">

                        <Button
                            className="ml-auto p-3 accent"
                            type="submit"
                        >
                            <SquarePen className="h-6 w-6 pr-2" />
                            Post
                        </Button>

                    </CardFooter>



                </form>

            </Form>



        </Card>



    )





}





export default AnnouncementForm


