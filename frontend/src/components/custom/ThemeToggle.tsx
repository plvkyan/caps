


// Imports
// Lucide React Icon Imports
import {
    Check,
    Moon,
    Sun,
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



// 
import { useTheme } from "@/components/custom/ThemeProvider.tsx";




export function ThemeToggle() {

    const { theme, setTheme } = useTheme();




    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button
                    className="h-10 w-10"
                    variant="outline"
                    size="sm"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme("light")}
                >
                    Light
                    {theme === "light" && <Check className="h-7 w-7" />}
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme("dark")}
                >
                    Dark
                    {theme === "dark" && <Check className="h-7 w-7" />}
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme("system")}
                >
                    System
                    {theme === "system" && <Check className="h-7 w-7" />}
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}