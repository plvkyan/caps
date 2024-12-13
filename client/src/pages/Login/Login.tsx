


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
import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";




const formSchema = zod.object({

    userBlkLt: zod.string().min(1,
        { message: "Block and Lot/Name cannot be empty." }
    ),
    userPassword: zod.string().min(1),
})





const Login = () => {

    const { login, error, isLoading } = useLogin()

    const [showPassword, setShowPassword] = useState(false);

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

                                                    <div className="grid gap-2">

                                                        <div className="flex items-center gap-2">

                                                            <FormLabel className="flex gap-2">
                                                                Block and Lot
                                                                <span className="text-destructive"> * </span>
                                                            </FormLabel>

                                                            <TooltipProvider>

                                                                <Tooltip>

                                                                    <TooltipTrigger className="inline-block">
                                                                        <Info className="w-4 h-4 text-muted-foreground" />
                                                                    </TooltipTrigger>

                                                                    <TooltipContent side="right">
                                                                        <p> Don't have an account? Members of the HOA have to contact the GCHOAI officers for an account.  </p>
                                                                    </TooltipContent>

                                                                </Tooltip>

                                                            </TooltipProvider>

                                                        </div>

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

                                                    <div className="relative grid">

                                                        <div className="flex items-center gap-2 pb-2">

                                                            <FormLabel> Password </FormLabel>

                                                            <TooltipProvider>

                                                                <Tooltip>

                                                                    <TooltipTrigger className="inline-block">

                                                                        <Info className="w-4 h-4 text-muted-foreground" />
                                                                    </TooltipTrigger>

                                                                    <TooltipContent side="right">
                                                                        <p> Forgot your password? Please contact the GCHOAI Officers to reset your password. </p>
                                                                    </TooltipContent>

                                                                </Tooltip>

                                                            </TooltipProvider>

                                                        </div>

                                                        <FormControl>

                                                            <Input
                                                                id="userPassword"
                                                                placeholder="Password"
                                                                type={showPassword ? "text" : "password"}
                                                                {...field}
                                                                required
                                                            />

                                                        </FormControl>

                                                        <Button
                                                            className="absolute w-7 h-7 top-[25px] right-0.5 bg-background hover:bg-background"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            type="button"
                                                        >
                                                            {showPassword ? <Eye className="absolute text-muted-foreground w-4 h-4 right-3 top-3" /> : <EyeOff className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />}
                                                        </Button>

                                                    </div>


                                                </FormItem>

                                            )
                                        }}

                                    />

                                    <Button
                                        className="w-full mt-4"
                                        disabled={isLoading}
                                    >
                                        Login
                                        {isLoading && <LoadingSpinner className="h-4 w-4" />}
                                    </Button>

                                </div>

                                <div className="mt-4 text-center text-sm flex flex-col gap-3">

                                    <FormMessage />

                                    {error && <div className="text-destructive"> {error}. </div>}

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