


// Layout Components Import
// Sidebar Component Import
import Sidebar from "@/components/layout/Sidebar";

// Navbar Component Import
import Navbar from "@/components/layout/Navbar";



// shadcn Components Import
// shadcn Toaster Import
import { Toaster } from "../ui/toaster";





export default function LayoutWrapper(props) {



    

    return (



        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

            <Sidebar />

            <div className="flex flex-col overflow-x-auto">

                <Navbar />

                <main className="flex flex-1 flex-col gap-4 bg-light-bg lg:gap-4">

                    <Toaster />

                    <div className="flex min-h-screen w-full bg-light-bg flex-col">

                        <main className="flex flex-1 flex-col bg-light-bg gap-4 p-4 md:gap-5 md:p-8">

                            {props.children}

                        </main>

                    </div>

                </main>

            </div>

        </div>



    )
}