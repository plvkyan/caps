import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"



// Hooks Import
import { useAuthContext } from "@/hooks/useAuthContext";





export function AdminSettings() {

    const { user } = useAuthContext()

    useEffect(() => {
        document.title = "Settings | GCTMS "
    }, []);

    return (

        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />

                    <div className="flex min-h-screen w-full flex-col">

                        <main className="flex bg-light-bg min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-black-bg p-4 md:gap-8 md:p-10">

                            <div className="mx-auto grid w-full max-w-6xl gap-2">
                                <h1 className="text-3xl font-semibold">Settings</h1>
                            </div>
                            
                            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
                                
                                <div className="grid gap-6">



                                    <Card >
                                        <CardHeader>
                                            <CardTitle> Block and Lot </CardTitle>
                                            <CardDescription className="pt-1">
                                                Since you're an admin, instead of a block and lot, your name will be used. Only the president can change this for integrity.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form>
                                                <Input placeholder="Blk 24 Lt 1" value={user.blkLt} disabled/>
                                            </form>
                                        </CardContent>
                                    </Card>



                                    <Card>
                                        <CardHeader>
                                            <CardTitle> Role </CardTitle>
                                            <CardDescription className="pt-1">
                                                This shows what user role you have in the system, which decides what you can access or not. 
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form>
                                                <Input placeholder="Blk 24 Lt 1" value={user.role} disabled/>
                                            </form>
                                        </CardContent>
                                    </Card>



                                    <Card >
                                        <CardHeader>
                                            <CardTitle> Position </CardTitle>
                                            <CardDescription className="pt-1">
                                                Typically, admins are composed of the GCHOAI officers. This shows your position in the system.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form>
                                                <Input placeholder="Blk 24 Lt 1" value={user.position} disabled/>
                                            </form>
                                        </CardContent>
                                    </Card>



                                    <Card >



                                        <CardHeader>
                                            <CardTitle> Password </CardTitle>
                                            <CardDescription className="pt-1">
                                                You can change your password here. Please don't forget your password. The only way to reset an account's password is by the president.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <form className="flex flex-col gap-2">
                                                <div>
                                                    <Label className="text-base"> New Password </Label>
                                                </div>

                                                <Input
                                                    placeholder="New Password"
                                                    type="password"
                                                />
                                
                                            </form>
                                            <form className="flex flex-col gap-2 mt-4">
                                                <div>
                                                    <Label className="text-base"> Confirm Password </Label>
                                                </div>

                                                <Input
                                                    placeholder="Confirm New Password"
                                                    type="password"
                                                />
                                
                                            </form>
                                        </CardContent>

                                        <CardFooter className="border-t px-6 py-4">
                                            <Button>Save</Button>
                                        </CardFooter>



                                    </Card>



                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

        </>
    )
}
