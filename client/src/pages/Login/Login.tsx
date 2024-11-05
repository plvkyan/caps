


// Imports
// shadcn Components Import
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Component Import
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Link Component Import
import { Link } from "react-router-dom";

// shadcn Tooltip Component Import
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from "@/components/ui/tooltip";



// Utility
import * as zod from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Hooks
import { useLogin } from "@/hooks/useLogin"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";




const formSchema = zod.object({

    userBlkLt: zod.string().min(1,
        { message: "Block and Lot/Name cannot be empty." }
    ),
    userPassword: zod.string().min(1),
})





const Login = () => {

    const { login, error, isLoading } = useLogin()

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userBlkLt: "",
            userPassword: "",
        }
    })

    // Call when form is submitted
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        await login(values.userBlkLt, values.userPassword)
    }





    return (

        <>

            <div className="h-screen flex align-center justify-center">

                <Card className="my-auto mt-auto max-w-sm login">

                    <CardHeader>

                        <CardTitle className="text-2xl"> Login to your HOA account </CardTitle>
                        <CardDescription>
                            Enter your block and lot and your password to login to your account.
                        </CardDescription>

                    </CardHeader>



                    <Form {...form} >

                        <form onSubmit={form.handleSubmit(handleSubmit)}>

                            <CardContent>

                                <div className="grid gap-4">

                                    {/* First FormField */}
                                    <FormField
                                        control={form.control}
                                        name="userBlkLt"
                                        render={({ field }) => {
                                            return (

                                                <FormItem>

                                                    <div className="grid gap-3">

                                                        <FormLabel> Block and Lot </FormLabel>

                                                        <FormControl>

                                                            <Input
                                                                id="userBlkLt"
                                                                placeholder="Example: Blk 24 Lt 1"
                                                                type="text"
                                                                {...field}
                                                                required
                                                            />

                                                        </FormControl>

                                                    </div>

                                                </FormItem>

                                            )
                                        }}
                                    />



                                    {/* Second FormField */}


                                    <FormField
                                        control={form.control}
                                        name="userPassword"
                                        render={({ field }) => {
                                            return (

                                                <FormItem>

                                                    <div className="grid">

                                                        <div className="flex items-center pb-2">

                                                            <FormLabel> Password </FormLabel>

                                                            <TooltipProvider>

                                                                <Tooltip>

                                                                    <TooltipTrigger className="ml-auto inline-block">
                                                                        <Link to="#" className="text-sm underline">
                                                                            Forgot your password?
                                                                        </Link>
                                                                    </TooltipTrigger>

                                                                    <TooltipContent side="right">
                                                                        <p> Please contact the GCHOAI Officers to reset your account. </p>
                                                                    </TooltipContent>



                                                                </Tooltip>

                                                            </TooltipProvider>

                                                        </div>

                                                        <FormControl>

                                                            <Input
                                                                id="userPassword"
                                                                placeholder="Password"
                                                                type="password"
                                                                {...field}
                                                                required
                                                            />

                                                        </FormControl>

                                                    </div>


                                                </FormItem>

                                            )
                                        }}

                                    />

                                    <Button
                                        className="w-full"
                                        disabled={isLoading}    
                                    >
                                        Login
                                        {isLoading && <LoadingSpinner className="h-4 w-4" />}
                                    </Button>

                                </div>

                                <div className="mt-4 text-center text-sm flex flex-col gap-3">

                                    <TooltipProvider>

                                        <Tooltip>

                                            <TooltipTrigger>
                                                <Link to="#" className="text-sm underline">
                                                    Don&apos;t have an account?
                                                </Link>
                                            </TooltipTrigger>

                                            <TooltipContent side="bottom">
                                                <p> You need to be a unit owner in Grand Cedar Homes to get one. </p>
                                            </TooltipContent>

                                        </Tooltip>

                                    </TooltipProvider>

                                    <div className="">

                                            <FormMessage />

                                            {error && <div className="text-destructive"> {error} </div>} 

                                    </div>

                                </div>

                            </CardContent>

                        </form>

                    </Form>


                </Card>

            </div >

        </>

    )

}

export default Login;