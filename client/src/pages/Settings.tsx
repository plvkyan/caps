


// Imports

// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

// shadcn Form Component Import
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"



// Custom Components Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";

// shacdn Sonner Import 
import { toast } from "sonner";



// Data table imports
// Data table column definitions imports

// Data table component import



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// React Imports
import {
    useEffect,
    useState,
} from "react"

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PencilLine, Save, TriangleAlert } from "lucide-react"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner"
import { updateUser } from "@/data/user-api"



// Types Imports




const passwordFormSchema = z.object({
    userPassword: z.string().min(1, "Password is required."),
    userConfirmPassword: z.string().min(1, "You are required to confirm your password."),
}).refine(
    (data) => {
        return data.userPassword === data.userConfirmPassword;
    }, {
    message: "Passwords do not match.",
    path: ["userConfirmPassword"],
}
);

const emailFormSchema = z.object({
    userEmail: z.string().email().min(1, "Email is required."),
});



export default function Settings() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Edit password state
    const [editPassword, setEditPassword] = useState<boolean>(false);
    // Edit email state
    const [editEmail, setEditEmail] = useState<boolean>(false);
    // Error state
    const [error, setError] = useState<string>("");
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);



    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
    })

    const emailForm = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            userEmail: user.userEmail,
        }
    })



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Settings | GCTMS";
    }, []);



    // Functions
    const handleDiscard = async () => {

        if (editEmail && editPassword) {
            setEditEmail(false)
            setEditPassword(false)
            emailForm.reset({
                userEmail: user.userEmail
            })
            passwordForm.reset()
        }

        if (editEmail) {
            setEditEmail(false)
            emailForm.reset({
                userEmail: user.userEmail
            })
        }

        if (editPassword) {
            setEditPassword(false)
            passwordForm.reset()
        }

    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            if (editEmail && editPassword) {
                const emailData = emailForm.getValues();
                const passwordData = passwordForm.getValues();

                user.userEmail = emailData.userEmail;
                user.userPassword = passwordData.userPassword;


                const response = await updateUser(user._id, user);
                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success("Credentials updated successfully.", {
                        closeButton: true,
                        duration: 10000
                    })
                    emailForm.reset({
                        userEmail: user.userEmail
                    })
                    passwordForm.reset()
                    setEditEmail(false);
                    setEditPassword(false);
                }
            } else if (editEmail) {
                const emailData = emailForm.getValues();
                user.userEmail = emailData.userEmail;


                const response = await updateUser(user._id, user);
                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success("Email changed successfully.", {
                        closeButton: true,
                        duration: 10000
                    })
                    emailForm.reset({
                        userEmail: user.userEmail
                    })
                    passwordForm.reset()
                    setEditEmail(false);
                }
            } else if (editPassword) {
                const passwordData = passwordForm.getValues();
                user.userPassword = passwordData.userPassword;

                const response = await updateUser(user._id, user);
                if (response.ok) {
                    toast.success("Password changed successfully.", {
                        closeButton: true,
                        duration: 10000
                    })
                    setEditPassword(false);
                }
            }
        } catch (error: any) {
            setError(error.message || "Failed to update user information");
        } finally {
            setLoading(false);
        }
    }





    return (

        // The sidebar provider - no changes here
        <SidebarProvider>

            {/* The sidebar itself and its contents - there are changes here */}
            <AppSidebar />

            {/* The inset effect - no changes here */}
            <SidebarInset>

                {/* The header provided along with the sidebar */}
                <header className="flex h-16 shrink-0 p-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

                    {/* Container within the header to organize items */}
                    <div className="w-full flex items-center justify-between gap-2">

                        {/* Container for breadcrumbs and sidebar trigger */}
                        <div className="flex items-center gap-2 p-4">

                            <SidebarTrigger className="" />

                            <Separator orientation="vertical" className="mr-2 h-4" />

                            {/* Page breadcrumbs */}
                            <Breadcrumb>

                                <BreadcrumbList>

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Settings
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>

                                </BreadcrumbList>

                            </Breadcrumb>

                        </div>

                        {/* Account navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            <ThemeToggle />
                            <NavUser />
                        </div>

                    </div>

                </header>

                <main className="flex flex-col gap-4 p-8 pt-4">

                    <div className="flex flex-col">
                        <h1 className="flex gap-2 items-center font-semibold text-2xl">
                            Settings
                        </h1>
                        <p className="font-light text-muted-foreground"> This is how other users in the system will see you on the site. It also contains your position in the HOA and your user privileges within the system. </p>
                    </div>

                    <Separator className="mt-2 mb-4" />

                    {/* Error message */}
                    {error && (
                        <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-md bg-red-500/20 border border-red-500">
                            <TriangleAlert className="h-5 w-5 text-red-500" />
                            <span className="text-red-500"> {error} </span>
                        </div>
                    )}

                    <div className="flex flex-col mx-auto max-w-xl">

                        <div className="flex flex-col gap-2 mb-3">

                            <Label className="font-normal">
                                Block and lot
                            </Label>

                            <Input disabled value={user.userBlkLt} />

                            {user && user.userPosition != "Unit Owner" ?
                                <p className="text-xs text-muted-foreground font-light">This name is how users in the system sees you. As an officer, it is typically your real name. You cannot change this.</p> :
                                <p className="text-xs text-muted-foreground font-light">This is your unit's block and lot–used as your credentials. You cannot change this.</p>
                            }

                        </div>


                        <Form {...passwordForm}>

                            <form onSubmit={passwordForm.handleSubmit(handleSubmit)}>

                                <FormField
                                    control={passwordForm.control}
                                    name="userPassword"
                                    render={({ field }) => {

                                        return (
                                            <FormItem className="flex flex-col gap-2 my-6">

                                                <FormLabel className="flex items-center gap-2 font-normal">
                                                    Password
                                                    {!editPassword ?
                                                        <PencilLine className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setEditPassword(!editPassword)} /> :
                                                        <span className="text-destructive"> * </span>
                                                    }
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        autoComplete="password"
                                                        disabled={!editPassword}
                                                        id="userPassword"
                                                        placeholder={editPassword ? "Enter a new password" : undefined}
                                                        required
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />

                                {editPassword && (
                                    <FormField
                                        control={passwordForm.control}
                                        name="userConfirmPassword"
                                        render={({ field }) => {

                                            return (
                                                <FormItem className="flex flex-col gap-2 my-6">

                                                    <FormLabel className="flex items-center gap-2 font-normal">
                                                        Confirm Password
                                                        {!editPassword ?
                                                            <PencilLine className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setEditPassword(!editPassword)} /> :
                                                            <span className="text-destructive"> * </span>
                                                        }
                                                    </FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            autoComplete="password"
                                                            disabled={!editPassword}
                                                            id="userConfirmPassword"
                                                            placeholder={editPassword ? "Confirm new password" : undefined}
                                                            required
                                                            type="password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />
                                )}

                            </form>

                        </Form>

                        <Form {...emailForm}>

                            <form onSubmit={emailForm.handleSubmit(handleSubmit)}>

                                <FormField
                                    control={emailForm.control}
                                    name="userEmail"
                                    render={({ field }) => {

                                        return (
                                            <FormItem className="flex flex-col gap-2 mt-4 mb-6">

                                                <FormLabel className="flex items-center gap-2 font-normal">
                                                    Email
                                                    {!editEmail ?
                                                        <PencilLine className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setEditEmail(!editEmail)} /> :
                                                        <span className="text-destructive"> * </span>
                                                    }
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        autoComplete="email"
                                                        disabled={!editEmail}
                                                        id="userEmail"
                                                        placeholder={editEmail ? "Enter a new email" : undefined}
                                                        required
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-muted-foreground font-light">Used to notify you of any important information.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }}
                                />

                            </form>

                        </Form>

                        <div className="flex flex-col gap-2 my-6">

                            <Label className="font-normal">
                                User position
                            </Label>

                            <Input disabled value={user.userPosition} />

                            {user && user.userPosition != "Unit Owner" ?
                                <p className="text-xs text-muted-foreground font-light">You are an officer of the GCHOAI. You cannot change this. </p> :
                                <p className="text-xs text-muted-foreground font-light">You are a unit owner and a member of the GCHOAI. You cannot change this. </p>
                            }

                        </div>

                        <div className="flex flex-col gap-2 my-6">

                            <Label className="font-normal">
                                User role
                            </Label>

                            <Input disabled value={user.userRole} />

                            {user && user.userPosition != "Unit Owner" ?
                                <p className="text-xs text-muted-foreground font-light">You have access to most of the system's features and are responsible of managing the HOA. You cannot change this.</p> :
                                <p className="text-xs text-muted-foreground font-light">An outstanding member of the HOA can take advantage of its benefits. You cannot change this.</p>
                            }

                        </div>

                        {(editPassword || editEmail) && (
                            <div className="flex gap-4">
                                <Button
                                    className="w-fit mt-8 mb-4"
                                    onClick={handleDiscard}
                                    type="submit"
                                    variant="outline"
                                >
                                    Discard changes
                                </Button>

                                <Button
                                    className="w-fit mt-8 mb-4"
                                    onClick={async () => {
                                        if (editEmail && editPassword) {
                                            const emailValid = await emailForm.trigger();
                                            const passwordValid = await passwordForm.trigger();
                                            if (emailValid && passwordValid) {
                                                await handleSubmit();
                                            }
                                        } else if (editEmail) {
                                            const emailValid = await emailForm.trigger();
                                            if (emailValid) {
                                                await handleSubmit();
                                            }
                                        } else if (editPassword) {
                                            const passwordValid = await passwordForm.trigger();
                                            if (passwordValid) {
                                                await handleSubmit();
                                            }
                                        }
                                    }}
                                    type="button"
                                >
                                    {loading ? <LoadingSpinner className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                                    Save changes
                                </Button>
                            </div>
                        )}





                    </div>

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}