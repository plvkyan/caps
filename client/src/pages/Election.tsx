


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

import { isValidPhoneNumber } from "react-phone-number-input";



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
import { Eye, EyeOff, PencilLine, Save, TriangleAlert } from "lucide-react"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner"
import { updateUser } from "@/data/user-api"
import { PhoneInput } from "@/components/ui/phone-input"



// Types Imports



const passwordValidation = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

const passwordFormSchema = z.object({
    userPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(passwordValidation, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    userConfirmPassword: z.string()
        .min(1, { message: "You are required to confirm your password." }),
}).refine(
    (data) => data.userPassword === data.userConfirmPassword,
    {
        message: "Passwords do not match.",
        path: ["userConfirmPassword"],
    }
);

const emailFormSchema = z.object({
    userEmail: z.string().email().min(1, "Email is required."),
});

const mobileNoFormSchema = z.object({
    userMobileNo: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});



export default function Election() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Edit password state
    const [editPassword, setEditPassword] = useState<boolean>(false);
    // Edit email state
    const [editEmail, setEditEmail] = useState<boolean>(false);
    // Edit mobile no
    const [editMobileNo, setEditMobileNo] = useState<boolean>(false);
    // Error state
    const [error, setError] = useState<string>("");
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [passwordStrength, setPasswordStrength] = useState<string>("None");



    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
    })

    const emailForm = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            userEmail: user.userEmail,
        }
    })

    const mobileNoForm = useForm<z.infer<typeof mobileNoFormSchema>>({
        resolver: zodResolver(mobileNoFormSchema),
        defaultValues: {
            userMobileNo: user.userMobileNo,
        }
    })



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Election | GCTMS";
    }, []);

    useEffect(() => {
        if (passwordForm.watch().userPassword) {
            setPasswordStrength(evaluatePasswordStrength(passwordForm.watch().userPassword));
        }

        if (passwordForm.watch().userPassword === "") {
            setPasswordStrength("None");
        }
    }, [passwordForm.watch().userPassword]);

    // Functions
    const handleDiscard = async () => {

        if (editEmail) {
            setEditEmail(false)
            emailForm.reset({
                userEmail: user.userEmail
            })
        }

        if (editPassword) {
            passwordForm.reset({
                userPassword: "",
                userConfirmPassword: ""
            })
            setEditPassword(false)
        }

        if (editMobileNo) {
            setEditMobileNo(false)
            mobileNoForm.reset({
                userMobileNo: user.userMobileNo
            })
        }

    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            if (editEmail) {
                const emailData = emailForm.getValues();
                user.userEmail = emailData.userEmail;
            }

            if (editMobileNo) {
                const mobileNoData = mobileNoForm.getValues();
                user.userMobileNo = mobileNoData.userMobileNo;
            }

            if (editPassword) {
                const passwordData = passwordForm.getValues();
                user.userPassword = passwordData.userPassword;
            }

            const response = await updateUser(user._id, user);

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Credentials updated successfully.", {
                    closeButton: true,
                    duration: 10000
                })

                if (editEmail) {
                    emailForm.reset({
                        userEmail: user.userEmail
                    })
                    setEditEmail(false);
                }

                if (editMobileNo) {
                    mobileNoForm.reset({
                        userMobileNo: user.userMobileNo
                    })
                    setEditMobileNo(false);
                }

                if (editPassword) {
                    passwordForm.reset({
                        userPassword: "",
                        userConfirmPassword: ""
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

    const evaluatePasswordStrength = (password) => {
        let score = 0;

        if (!password) return 'None';

        // Check password length
        if (password.length > 8) score += 1;
        // Contains lowercase
        if (/[a-z]/.test(password)) score += 1;
        // Contains uppercase
        if (/[A-Z]/.test(password)) score += 1;
        // Contains numbers
        if (/\d/.test(password)) score += 1;
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Fair';
            case 4:
                return 'Good';
            case 5:
                return 'Strong';
            default:
                return 'None';
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
                                            Election
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
                            Election of new officers
                        </h1>
                        <p className="font-light text-muted-foreground"> This action is irreversible. This will archive all the current officers' accounts and create a new set of officer accounts. This is irreversible. You will be logged out after successfully transferring the privileges. </p>
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
                                            <FormItem className="relative flex flex-col gap-2 my-6">

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
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                    />
                                                </FormControl>

                                                {editPassword && (
                                                    <Button
                                                        className="absolute w-7 h-7 top-[23px] right-0.5 bg-background hover:bg-background"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        type="button"
                                                    >
                                                        {showPassword ? <Eye className="absolute text-muted-foreground w-4 h-4 right-3 top-3" /> : <EyeOff className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />}
                                                    </Button>
                                                )}

                                                {editPassword && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-muted-foreground font-light">Password strength: </span>
                                                        <span className={`text-xs font-semibold ${passwordStrength === 'None' ? 'text-muted-foreground' : passwordStrength === 'Weak' ? 'text-destructive' : passwordStrength === 'Fair' ? 'text-warning' : passwordStrength === "Good" ? 'text-foreground' : passwordStrength === "Strong" ? 'text-primary' : 'text-foreground'}`}>{passwordStrength}</span>
                                                    </div>
                                                )}

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
                                                <FormItem className="relative flex flex-col gap-2 my-6">

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
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        className="absolute w-7 h-7 top-[23px] right-0.5 bg-background hover:bg-background"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        type="button"
                                                    >
                                                        {showConfirmPassword ? <Eye className="absolute text-muted-foreground w-4 h-4 right-3 top-3" /> : <EyeOff className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />}
                                                    </Button>
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

                        <Form {...mobileNoForm}>

                            <form onSubmit={mobileNoForm.handleSubmit(handleSubmit)}>

                                <FormField
                                    control={mobileNoForm.control}
                                    name="userMobileNo"
                                    render={({ field }) => {

                                        return (
                                            <FormItem className="flex flex-col gap-2 my-6">

                                                <FormLabel className="flex items-center gap-2 font-normal">
                                                    Mobile No.
                                                    {!editMobileNo ?
                                                        <PencilLine className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setEditMobileNo(!editMobileNo)} /> :
                                                        <span className="text-destructive"> * </span>
                                                    }
                                                </FormLabel>

                                                <FormControl>
                                                    <PhoneInput
                                                        disabled={!editMobileNo}
                                                        id="userMobileNo"
                                                        placeholder={editMobileNo ? "Enter a new mobile number" : undefined}
                                                        required
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-muted-foreground font-light">Used to notify you of any important information. Inputting your mobile number means you consent to receiving calls and SMS messages from the HOA.</FormDescription>
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
                                <p className="text-xs text-muted-foreground font-light">You have access to most of the system's features and is responsible of managing the HOA. You cannot change this.</p> :
                                <p className="text-xs text-muted-foreground font-light">An outstanding member of the HOA can take advantage of its benefits. You cannot change this.</p>
                            }

                        </div>

                        {user && user.userPosition === "President" && (
                            <div className="flex flex-col gap-2 p-4 my-6 bg-destructive/10 rounded-md border border-destructive/100">

                                <Label className="font-semibold">
                                    Elect new officers
                                </Label>

                                <p className="text-xs font-light">
                                    This will archive all the current officers' accounts and create a new set of officer accounts. This is irreversible. You will be logged out after successfully transferring the privileges.
                                </p>

                                <Button variant="destructive" size="sm" className="w-fit px-4 mt-2">
                                    Elect new officers
                                </Button>

                            </div>
                        )}

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
                                        if (editEmail && editPassword && editMobileNo) {
                                            const emailValid = await emailForm.trigger();
                                            const mobileNoValid = await mobileNoForm.trigger();
                                            const passwordValid = await passwordForm.trigger();
                                            if (emailValid && passwordValid && mobileNoValid) {
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
                                        } else if (editMobileNo) {
                                            const mobileNoValid = await mobileNoForm.trigger();
                                            if (mobileNoValid) {
                                                await handleSubmit();
                                            }
                                        } else if (editEmail && editMobileNo) {
                                            const emailValid = await emailForm.trigger();
                                            const mobileNoValid = await mobileNoForm.trigger();

                                            if (emailValid && mobileNoValid) {
                                                await handleSubmit();
                                            }
                                        } else if (editEmail && editPassword) {
                                            const emailValid = await emailForm.trigger();
                                            const passwordValid = await passwordForm.trigger();

                                            if (emailValid && passwordValid) {
                                                await handleSubmit();
                                            }
                                        } else if (editPassword && editMobileNo) {
                                            const passwordValid = await passwordForm.trigger();
                                            const mobileNoValid = await mobileNoForm.trigger();

                                            if (passwordValid && mobileNoValid) {
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