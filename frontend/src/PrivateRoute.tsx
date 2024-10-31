import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Define the props for the PrivateRoute component
interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    if (user.stat === "Archived") {
        return <Navigate to="/error" replace={true} />;
    }

    return <Component {...rest} />;
}