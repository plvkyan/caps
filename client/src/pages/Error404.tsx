

// Imports

// shadcn Component Imports
// shadcn Button Component Import
import { Button } from '@/components/ui/button';

// shadcn Separator Component Import
import { Separator } from '@/components/ui/separator';

// Hooks
// useAuthContext Hook Import
import { useAuthContext } from '@/hooks/useAuthContext';



// Utility Imports
// React Import
import React from 'react';

// react-router-dom useNavigate Import
import { useNavigate } from 'react-router-dom';





const Error404: React.FC = () => {



    // Hooks
    // useAuthContext Hook
    const { user } = useAuthContext();

    // useNavigate Hook
    const navigate = useNavigate();

    const theme = localStorage.getItem("vite-ui-theme");



    // Functions
    // Navigate back to a page function
    const navigateBack = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/home');
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center h-[100svh] md:h-[90svh] min-w-vw ">

            {theme && theme === "dark" && (
                <img
                    alt=""
                    className="max-h-[50px] md:max-h-[100px] w-auto"
                    onClick={navigateBack}
                    src="https://res.cloudinary.com/dmodbgukj/image/upload/v1730798270/grand-cedar-homes-new-logo-dark-mode_sucwgk.png"
                />
            )}

            {theme && theme === "light" && (
                <img
                    alt=""
                    className="max-h-[50px] md:max-h-[100px] w-auto"
                    onClick={navigateBack}
                    src="https://res.cloudinary.com/dmodbgukj/image/upload/v1730798254/grand-cedar-homes-new-logo-light-mode_fgdxbd.png"
                />
            )}

            <Separator orientation="vertical" className={"hidden md:block max-h-48"} />
            <Separator orientation="horizontal" className={"block md:hidden max-w-48"} />

            <div className="flex flex-col gap-2 items-center md:items-start text-center text-wrap">
                <h1 className={"text-4xl md:text-6xl"}> 404</h1>
                <p className="text-xs md:text-base text-wrap text-muted-foreground"> Oops. The page you're looking for doesn't exist. </p>
                <Button className="my-6 md:my-4 text-xs md:text-base font-normal" onClick={navigateBack} size="sm" variant="outline"> Let's go back </Button>
            </div>

        </div>
    );
};





export default Error404;