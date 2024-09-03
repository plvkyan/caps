


"use client";

// Lucide Icons Import
import {
    CirclePlus,
} from "lucide-react"



// shadcn Components Import

// shadcn Button Component Import
import {
    Button
} from "@/components/ui/button"

// shadcn Card Component Import
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from "@/components/ui/card";

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
    FormDescription,
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
import { useToast } from "@/components/ui/use-toast";



// Custom Components Import






// Utility
import * as React from 'react';
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



// Hooks
import { useSignup } from "@/hooks/useSignup"
import { useUsersContext } from "@/hooks/useUsersContext";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useAuthContext } from "@/hooks/useAuthContext";





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
            if (data.role === "Admin") {
                return data.position = "Admin";
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





const UserEditForm = ({ userAccount, showEditDialog, setShowEditDialog }) => {

    const { dispatch } = useUsersContext()
    const { toast } = useToast()
    const { signup, error, isLoading } = useSignup()



    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blkLt: userAccount.blkLt,
            password: userAccount.password,
            passwordConfirm: userAccount.password,
            role: userAccount.position,
            position: userAccount.role,
            stat: userAccount.stat,
        }
    })


    const { reset } = form;
    const { isSubmitting, isSubmitSuccessful } = form.formState;

    const { user } = useAuthContext()




    React.useEffect(() => {

        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])



    const role = form.watch("role");



    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        const response = await fetch('http://localhost:4000/api/users/' + userAccount._id, {
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

            dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
            window.location.reload()

        }

    };



    return (

        <>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>

                <DialogContent className="sm:max-w-[425px]">

                    <Form {...form}>

                        <form id="userForm" onSubmit={form.handleSubmit(handleSubmit)}>

                            <DialogHeader className="mt-6">
                                <DialogTitle> Update existing user </DialogTitle>
                                <DialogDescription>
                                    We don't recommend editing their block and lot/name unless intended.
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
                                                            defaultValue={userAccount.position}
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

                                                            {user.role == "President" && (
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

                                <Button type="submit" form="userForm"> Update User </Button>

                            </DialogFooter>



                        </form>

                    </Form>

                </DialogContent>



            </Dialog >

        </>

    )

}



export default UserEditForm
