


// Imports
// Lucide Icons Import
import {
    CirclePlus,
} from "lucide-react"



// shadcn Components Import
// shadcn Button Component Import
import {
    Button
} from "@/components/ui/button"
// shadcn Dialog Component Import
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
// shadcn Input Component Import
import { Input } from "@/components/ui/input"
// shadcn Radio Group Component Import
import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group"
// shadcn Select Component Import
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
// shadcn Toast Import
import { toast } from "sonner";







// Utility
import * as React from 'react';
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



// Hooks
import { useSignup } from "@/hooks/useSignup"
import { useAuthContext } from "@/hooks/useAuthContext";
// import { useUsersContext } from "@/hooks/useUsersContext";





// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
// const passwordValidation = new RegExp(
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
//   );


// Para sa zod
//   .regex(passwordValidation, {
//     message: "Password must be at least 8 characters long and contains a lowercase letter,an uppercase letter, a number, and a special character"
// })





const formSchema = zod
    .object({
        blkLt: zod.string().min(1,
            { message: "Block and Lot/Name cannot be empty." }
        ),
        password: zod.string().min(8),
        passwordConfirm: zod.string(),
        role: zod.enum(["Unit Owner", "Admin"]),
        position: zod.enum([
            "Admin",
            "Unit Owner",
            "President",
            "Vice President",
            "Secretary",
            "Treasurer",
            "Auditor",
        ]).optional(),
        stat: zod.enum(["Archived", "Unarchived"]),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm;
        },
        {
            message: "Passwords do not match.",
            path: ["passwordConfirm"],
        }
    )
    .refine(
        (data) => {
            if (data.role === "Admin" && data.position === "Unit Owner") {
                return data.position = "Admin"
            }
            return true;
        },
        {
            message: "A position is required.",
            path: ["position"],
        }
    ).refine(
        (data) => {
            if (data.role === "Unit Owner") {
                return data.position = "Unit Owner"
            }
            return true;

        }
    );





const UserForm = () => {

    // const { dispatch } = useUsersContext()
    // const { toast } = useToast()

    const [open, setOpen] = React.useState(false)

    const { user } = useAuthContext()



    const { signup, error } = useSignup()



    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blkLt: "",
            password: "",
            passwordConfirm: "",
            role: "Unit Owner",
            position: "Unit Owner",
            stat: "Unarchived",
        }
    })

    const { reset } = form;
    const { isSubmitSuccessful } = form.formState;

    React.useEffect(() => {

        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])


    const role = form.watch("role");

    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        await signup(values.blkLt, values.password, values.position, values.role, values.stat)
        window.location.reload();

    };




    return (



        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button
                    className="p-3 max-[640px]:w-full accent"
                >
                    <CirclePlus className="h-6 w-6 pr-2" />
                    Create User
                </Button>
            </DialogTrigger>




            <DialogContent className="sm:max-w-[425px]">

                <Form {...form}>

                    <form id="userForm" onSubmit={form.handleSubmit(handleSubmit)}>

                        <DialogHeader className="mt-6">
                            <DialogTitle> Create a new user </DialogTitle>
                            <DialogDescription>
                                If creating an admin account, put their full name on the block and lot field and choose their corresponding position.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">



                            {/* First FormField */}
                            <FormField
                                control={form.control}
                                name="blkLt"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Block and Lot
                                                </FormLabel>

                                                <FormControl>

                                                    <Input
                                                        id="blkLt"
                                                        placeholder="Example: Blk 24 Lt 1 or Kyan Lumanog"
                                                        type="text"
                                                        className="col-span-3"
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



                            {/* Second FormField */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Role
                                                </FormLabel>

                                                <FormControl>

                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-row space-y-1 col-span-3"
                                                    >

                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Unit Owner" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Unit Owner
                                                            </FormLabel>
                                                        </FormItem>



                                                        {user.role != "President" && (
                                                            <FormItem className="flex items-center space-x-3 space-y-0 pl-3 !m-0">

                                                                <FormControl>
                                                                    <RadioGroupItem disabled value="Admin" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Admin
                                                                </FormLabel>

                                                            </FormItem>
                                                        )}

                                                        {user.role === "President" && (
                                                            <FormItem className="flex items-center space-x-3 space-y-0 pl-3 !m-0">

                                                                <FormControl>
                                                                    <RadioGroupItem value="Admin" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Admin
                                                                </FormLabel>

                                                            </FormItem>
                                                            
                                                        )}



                                                    </RadioGroup>

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



                            {/* Third FormField */}
                            {role === "Admin" && (
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (

                                        <FormItem>

                                            <div className="grid grid-cols-4 items-center gap-4">


                                                <FormLabel className="text-right"> Position </FormLabel>

                                                <Select onValueChange={field.onChange} defaultValue={field.value}>

                                                    <FormControl className="col-span-3">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the admin's position." />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectItem value="Admin"> Admin </SelectItem>
                                                        <SelectItem value="President"> President </SelectItem>
                                                        <SelectItem value="Vice President"> Vice President </SelectItem>
                                                        <SelectItem value="Secretary"> Secretary </SelectItem>
                                                        <SelectItem value="Treasurer"> Treasurer </SelectItem>
                                                        <SelectItem value="Auditor"> Auditor </SelectItem>
                                                    </SelectContent>

                                                </Select>


                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <div className=""></div>

                                                <div className="col-span-3">

                                                    <FormMessage />

                                                </div>

                                            </div>


                                        </FormItem>

                                    )}
                                />
                            )}




                            {/* Fourth FormField */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Password
                                                </FormLabel>

                                                <FormControl>

                                                    <Input
                                                        id="password"
                                                        placeholder="Enter password"
                                                        type="password"
                                                        className="col-span-3"
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



                            {/* Fifth FormField */}
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => {
                                    return (

                                        <FormItem>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <FormLabel className="text-right">
                                                    Confirm Password
                                                </FormLabel>

                                                <FormControl>

                                                    <Input
                                                        id="passwordConfirm"
                                                        placeholder="Confirm password"
                                                        type="password"
                                                        className="col-span-3"
                                                        required
                                                        {...field}
                                                    />

                                                </FormControl>

                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">

                                                <div className=""></div>

                                                <div className="col-span-3">

                                                    <FormMessage />

                                                    {error && <div className="text-destructive"> {error} </div>}

                                                </div>

                                            </div>

                                        </FormItem>

                                    )
                                }}

                            />

                        </div>

                        <DialogFooter>

                            <Button type="submit" form="userForm"> Create User </Button>

                        </DialogFooter>



                    </form>

                </Form>

            </DialogContent>


        </Dialog >



    )

}





export default UserForm