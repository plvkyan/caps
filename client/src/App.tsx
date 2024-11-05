


// Imports 

// CSS Import
import '@/index.css';



// Utility Import
// React Imports
// React Router Imports
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route,
} from 'react-router-dom';



// Context Imports
// Auth Context Import
import { useAuthContext } from "@/hooks/useAuthContext.tsx"



// Page Imports
// Amenity-related Imports
// Amenity List Page Import
import AmenityPage from '@/pages/Amenities/AmenityPage.tsx';
// Amenity Details Page Import
// import AmenityDetails from '@/pages/Amenities/AmenityDetails.tsx';
// Amenity Edit Form Page Import
import AmenityEditForm from '@/pages/Amenities/AmenityEditForm.tsx';
// Announcements Page Import
import Announcements from '@/pages/Announcements/Announcements.tsx';



// Archive-related Import
// Archives Page Import
import Archives from '@/pages/Archives/Archives.tsx';



// Bill-related Imports
// Bill Details Page Import
import BillPage from '@/pages/Bills/BillPage.tsx';
// Bills List Page Import
// import BillList from '@/pages/Bills/BillsList.tsx';
// Bill Payment Cancelled Page Import
import Cancelled from '@/pages/PaymentCancelled.tsx';
// Bill Payment Success Page Import
import Success from '@/pages/PaymentSuccess.tsx';



// Dashboard-related Import
// Dashboard Page Import
import DashboardPage from '@/pages/Dashboard/DashboardPage.tsx';



// Error-related Imports
// Error Archived Account Page Import
import ErrorArchivedAccount from '@/pages/ErrorArchivedAccount.tsx';
// Error 404 Not Found Page Import
import Error404 from '@/pages/Error404.tsx';



// Home-related Imports
// Home Page Import
import Home from '@/pages/Home/Home.tsx';



// Login-related Imports
// Login Page Import
import Login from '@/pages/Login/Login.tsx';

// Reservation-related Imports
// Reservation Details Page Import
// import { ReservationPage } from '@/pages/Reservations/ReservationPage.tsx';

// Reservations List Page Import
import ReservationPage from '@/pages/Reservations/ReservationPage.tsx';



// User-related Imports
// Users List Page Import
import AdminUsers from '@/pages/Admin/Users/UsersList.tsx';
import Settings from '@/pages/Settings.tsx';
import ReservationForm from '@/pages/Reservations/ReservationForm.tsx';
import PrivateRoute from '@/PrivateRoute.tsx';
import AmenityForm from '@/pages/Amenities/AmenityForm.tsx';
import ReservationDetails from '@/pages/Reservations/ReservationDetails.tsx';
import PrivateRouteAdmin from '@/pages/PrivateRouteAdmin.tsx';
import UserPage from '@/pages/Users/UserPage.tsx';
import UserForm from '@/pages/Users/UserForm';
import UserBulkForm from './pages/Users/UserBulkForm';
import AmenityDetails from './pages/Amenities/AmenityDetails';
import { BillForm } from './pages/Bills/BillForm';
import BillPresetForm from './pages/Bills/BillPresetForm';
import ArchivePage from './pages/Archives/ArchivePage';




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

                        {/* Unprotected Routes */}
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

                        {/* Login Page */}
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/dashboard" />}
                        >
                        </Route>





                        {/* Protected routes */}
                        <Route path="/dashboard" element={<PrivateRoute component={DashboardPage} />} />
                        <Route path="/settings" element={<PrivateRoute component={Settings} />} />
                        {/* Amenity routes */}
                        <Route
                            path="/amenities/create"
                            element={<PrivateRoute component={AmenityForm} />}
                        />
                        <Route
                            path="/amenities"
                            element={<PrivateRoute component={AmenityPage} />}
                        />
                        <Route
                            path="/amenities/:id"
                            element={<PrivateRoute component={AmenityDetails} />}
                        />




                        {/* Archive Routes */}
                        <Route
                            path="/archives"
                            element={<PrivateRoute component={ArchivePage} />}
                        />




                        {/* Bill Routes */}
                        <Route
                            path="/bills"
                            element={<PrivateRoute component={BillPage} />}
                        />

                        <Route
                            path="/bills/create/"
                            element={<PrivateRoute component={BillForm} />}
                        />

                        <Route
                            path="/bills/preset-create/"
                            element={<PrivateRoute component={BillPresetForm} />}
                        />




                        {/* Reservation routes */}
                        <Route
                            path="/reservations"
                            element={<PrivateRoute component={ReservationPage} />}
                        />
                        <Route
                            path="/reservations/create"
                            element={<PrivateRoute component={ReservationForm} />}
                        />
                        <Route
                            path="/reservations/:id"
                            element={<PrivateRoute component={ReservationDetails} />}
                        />





                        {/* User routes */}
                        <Route
                            path="/users"
                            element={<PrivateRoute component={UserPage} />}
                        />
                        <Route
                            path="/users/create"
                            element={<PrivateRoute component={UserForm} />}
                        />
                        <Route
                            path="/users/bulk-create"
                            element={<PrivateRoute component={UserBulkForm} />}
                        />


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
                                        element={!user ? <Login /> : <Navigate to="/dashboard" />}
                                    >
                                    </Route>

                                    {/* Dashboard Page */}
                                    <Route
                                        path="/dashboard"
                                        element={!user ? <Login /> : <DashboardPage />}
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
                                        element={<PrivateRoute component={ReservationPage} />}
                                    >
                                    </Route>

                                    {/* Reservation Form Page */}
                                    <Route
                                        path="/reservations/new"
                                        element={!user ? <Login /> : <ReservationForm />}
                                    >
                                    </Route>

                                    {/* Reservation Details Page */}
                                    {/* <Route
                                        path="/reservations/details/:id"
                                        element={!user ? <Login /> : <ReservationPage />}
                                    >
                                    </Route> */}

                                    {/* Bills Page */}
                                    <Route
                                        path="/bills"
                                        element={!user ? <Login /> : <BillPage />}
                                    >
                                    </Route>

                                    {/* Bill Form Page (Bill Creation for Admins) */}
                                    {/* <Route
                                        path="/bills/form"
                                        element={!user ? <Login /> : <BillsList />}
                                    >
                                    </Route> */}

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
                                        element={<AmenityPage />}
                                    >
                                    </Route>

                                    <Route
                                        path="/amenities/edit/:id"
                                        element={<AmenityEditForm />}
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
