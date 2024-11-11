

// Imports
// react-router-dom Navigate Import
import { Navigate } from "react-router-dom";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";





// Define the props for the PrivateRoute component
interface PrivateRouteProps {
    component: React.ComponentType<any>;
}





export default function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {

    // Contexts
    // Authentication Context
    const { user } = useAuthContext();

    // If the user is not logged in, redirect to the login
    if (!user) {
        return <Navigate to="/login" replace={true} />
    }

    // If the user is archived, redirect to the error page
    if (user.userVisibility === "Archived") {
        return <Navigate to="/error" replace={true} />
    }

    // If the user is not an admin, redirect to the 403 page
    // This is to prevent non-admin users from accessing admin pages
    if (user.userRole !== "Admin" && user.userPosition === "Unit Owner") {
        return <Navigate to="/403" replace={true} />
    }

    // Return the protected component
    return <Component {...rest} />;
}