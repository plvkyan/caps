


// Imports 

// CSS Import
import './index.css';



// Utility Import

// React Imports
// React Router Imports
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

// React Context Import
import { useContext } from "react";



// Context Imports
// Logout Context Import
import { useLogout } from "@/hooks/useLogout"

// Auth Context Import
import { useAuthContext } from "@/hooks/useAuthContext.tsx"



// Page Imports

// Amenity-related Imports
// Amenity List Page Import
import AmenitiesList from './pages/Amenities/AmenitiesList.tsx';

// Amenity Equipment Form Page Import
import AmenityEquipmentForm from './pages/Amenities/AmenityEquipmentForm.tsx';

// Amenity Facility Form Page Import
import AmenityFacilityForm from './pages/Amenities/AmenityFacilityForm.tsx';

// Announcements Page Import
import Announcements from '@/pages/Announcements/Announcements.tsx';

// Archives Page Import
import Archives from './pages/Archives/Archives.tsx';

// Bill-related Imports
// Bill Details Page Import
import { BillPage } from './pages/Bills/BillPage.tsx';

// Bills List Page Import
import BillsList from '@/pages/Bills/BillsList.tsx';

// Bill Payment Cancelled Page Import
import Cancelled from '@/pages/PaymentCancelled.tsx';

// Bill Payment Success Page Import
import Success from '@/pages/PaymentSuccess.tsx';

// Dashboard Page Import
import { Dashboard } from '@/pages/Dashboard.tsx';

// Error-related Imports
// Error Archived Account Page Import
import ErrorArchivedAccount from './pages/ErrorArchivedAccount.tsx';

// Error 404 Not Found Page Import
import Error404 from './pages/Error404.tsx';

// Home Page Import
import Home from './pages/Home/Home.tsx';

// Login Page Import
import Login from './pages/Login/Login.tsx';

// Reservation-related Imports
// Reservation Details Page Import
import { ReservationPage } from './pages/Reservations/ReservationPage.tsx';

// Reservations List Page Import
import Reservations from './pages/Reservations/Reservations.tsx';

// User-related Imports
// Users List Page Import
import AdminUsers from './pages/Admin/Users/UsersList.tsx';





function App() {



    // Contexts
    // User Context
    const { user } = useAuthContext()





    return (


        // Main App Container
        <div className="App">


            <BrowserRouter>

                <div className='Pages'>

                    <Routes>

                        {/* Redirect Empty Link to Home Page */}
                        <Route
                            path="/"
                            element={<Home />}
                        >
                        </Route>

                        {/* Home Page */}
                        <Route
                            path="/home"
                            element={<Home />}
                        >
                        </Route>



                        {(!user) &&
                            (
                                <>
                                    {/* If not logged in, redirect to Login Page */}
                                    <Route
                                        path="*"
                                        element={!user ? <Login /> : <Dashboard />}
                                    >
                                    </Route>
                                </>
                            )
                        }



                        {(user && user.stat != "Archived") &&
                            (
                                <>

                                    {/*
                        
                                    As of September 7, 2024 10:15 PM, I organized every route. I will update this again to remind how the links work,
                                    especially regarding the separation of admin and unit owner accounts.

                                    */}

                                    {/* If not logged in, redirect to Login Page */}
                                    <Route
                                        path="/login"
                                        element={!user ? <Login /> : <Dashboard />}
                                    >
                                    </Route>

                                    {/* Dashboard Page */}
                                    <Route
                                        path="/dashboard"
                                        element={!user ? <Login /> : <Dashboard />}
                                    >
                                    </Route>

                                    {/* Announcements Page */}
                                    <Route
                                        path="/announcements"
                                        element={!user ? <Login /> : <Announcements />}
                                    >
                                    </Route>

                                    {/* Reservations Page */}
                                    <Route
                                        path="/reservations"
                                        element={!user ? <Login /> : <Reservations />}
                                    >
                                    </Route>

                                    {/* Reservation Form Page */}
                                    <Route
                                        path="/reservations/form"
                                        element={!user ? <Login /> : <Reservations />}
                                    >
                                    </Route>

                                    {/* Reservation Details Page */}
                                    <Route
                                        path="/reservations/details/:id"
                                        element={!user ? <Login /> : <ReservationPage />}
                                    >
                                    </Route>

                                    {/* Bills Page */}
                                    <Route
                                        path="/bills"
                                        element={!user ? <Login /> : <BillsList />}
                                    >
                                    </Route>

                                    {/* Bill Form Page (Bill Creation for Admins) */}
                                    <Route
                                        path="/bills/form"
                                        element={!user ? <Login /> : <BillsList />}
                                    >
                                    </Route>

                                    {/* Bill Details Page */}
                                    <Route
                                        path="/bills/details/:id"
                                        element={!user ? <Login /> : <BillPage />}
                                    >
                                    </Route>

                                    {/* Bill Payment Successful Page */}
                                    <Route
                                        path="/bills/success"
                                        element={!user ? <Login /> : <Success />}
                                    >
                                    </Route>

                                    {/* Bill Payment Cancelled Page */}
                                    <Route
                                        path="/bills/cancelled"
                                        element={!user ? <Login /> : <Cancelled />}
                                    >
                                    </Route>

                                    {/* Archives Page */}
                                    <Route
                                        path="/archives"
                                        element={!user ? <Login /> : <Archives />}
                                    >
                                    </Route>

                                    {/* Users List Page */}
                                    <Route
                                        path="/users"
                                        element={!user ? <Login /> : <AdminUsers />}
                                    >
                                    </Route>

                                    <Route
                                        path="/amenities"
                                        element={<AmenitiesList />}
                                    >
                                    </Route>

                                    <Route
                                        path="/amenities/equipment/form"
                                        element={<AmenityEquipmentForm />}
                                    >
                                    </Route>

                                    <Route
                                        path="/amenities/facility/form"
                                        element={<AmenityFacilityForm />}
                                    >
                                    </Route>

                                    {/* If a page is not found, redirect to Error 404 Page */}
                                    <Route
                                        path="*"
                                        element={<Error404 />}
                                    >
                                    </Route>

                                </>
                            )
                        }

                        {(user && user.stat == "Archived") &&
                            (
                                <Route
                                    path="*"
                                    element={<ErrorArchivedAccount />}
                                >
                                </Route>
                            )
                        }




                    </Routes>

                </div>

            </BrowserRouter>

        </div>

    );
}

export default App
