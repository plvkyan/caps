


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
// Amenity-related Page Imports
// Amenity List Page Import
import AmenityPage from '@/pages/Amenities/AmenityPage.tsx';
// Amenity Form Page Import
import AmenityForm from '@/pages/Amenities/AmenityForm.tsx';
// Amenity Details Page Import
import AmenityDetails from '@/pages/Amenities/AmenityDetails';
// import AmenityDetails from '@/pages/Amenities/AmenityDetails.tsx';
import AmenityEditForm from './pages/Amenities/AmenityEditForm';



// Announcement-related Page Imports
// Announcements Page Import
import Announcements from '@/pages/Announcements/Announcements.tsx';



// Archive-related Import
// Archives Page Import
import ArchivePage from '@/pages/Archives/ArchivePage';



// Bill-related Page Imports
// Bill List Page Import
import BillPage from '@/pages/Bills/BillPage.tsx';
// Bill Form Page Import
import BillForm from '@/pages/Bills/BillForm';
// Bill Preset Form Page Import
import BillPresetForm from '@/pages/Bills/BillPresetForm';
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



// Settings-related Imports
// Settings Page Import
import Settings from '@/pages/Settings.tsx';



// Reservation-related Imports
// Reservations List Page Import
import ReservationPage from '@/pages/Reservations/ReservationPage.tsx';
// Reservation Form Page Import
import ReservationForm from '@/pages/Reservations/ReservationForm.tsx';
// Reservation Details Page Import
import ReservationDetails from '@/pages/Reservations/ReservationDetails.tsx';



// User-related Imports
// Users List Page Import
import UserPage from '@/pages/Users/UserPage.tsx';
// User Form Page Import
import UserForm from '@/pages/Users/UserForm';
// Bulk User Form Page Import
import UserBulkForm from '@/pages/Users/UserBulkForm';


// Custom Component Imports
// Private Route Import for securing routes and requiring authentication
import PrivateRoute from '@/PrivateRoute.tsx';
import UserDetails from './pages/Users/UserDetails';
import BillDetails from './pages/Bills/BillDetails';
import { useEffect } from 'react';
import { getSingleUser } from './data/user-api';





function App() {



    // Contexts
    // User Context
    const { user, dispatch } = useAuthContext()


    useEffect(() => {

        const fetchSingleUser = async () => {

            const response = await getSingleUser(user._id);

            const data = await response.json();

            localStorage.setItem('user', JSON.stringify(data));

            dispatch({ type: "UPDATE_USER", payload: data})
        }


        fetchSingleUser();

    }, [])


    return (



        // Main App Container
        <div className="App">


            <BrowserRouter>

                <div className='Pages'>


                    <Routes>



                        {/* Unprotected Routes */}
                        {/* Empty link to home page */}
                        <Route path="/" element={<Home />} />

                        {/* Home page */}
                        <Route path="/home" element={<Home />} />

                        {/* Login page */}
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />



                        {/* Error pages */}
                        {/* If a page is not found, redirect to Error 404 Page */}
                        <Route path="*" element={<Error404 />} />
                        {/* If an account is archived, redirect to Error 403 Page */}
                        <Route path="/archived" element={<ErrorArchivedAccount />} />



                        {/* Protected routes */}
                        {/* Dashboard page */}
                        <Route path="/dashboard" element={<PrivateRoute component={DashboardPage} />} />
                        {/* Settings page */}
                        <Route path="/settings" element={<PrivateRoute component={Settings} />} />



                        {/* Amenity routes */}
                        {/* Amenities list page */}
                        <Route path="/amenities" element={<PrivateRoute component={AmenityPage} />} />
                        {/* Create new amenity page */}
                        <Route path="/amenities/create" element={<PrivateRoute component={AmenityForm} />} />
                        {/* Amenity details page */}
                        <Route path="/amenities/:id" element={<PrivateRoute component={AmenityDetails} />} />
                        {/* Edit amenity page */}
                        <Route path="/amenities/edit/:id" element={<PrivateRoute component={AmenityEditForm} />} />




                        {/* Announcement routes */}
                        {/* Announcements page*/}
                        <Route path="/announcements" element={<PrivateRoute component={Announcements} />} />



                        {/* Archive Routes */}
                        <Route path="/archives" element={<PrivateRoute component={ArchivePage} />} />



                        {/* Bill routes */}
                        {/* Bill list page */}
                        <Route path="/bills" element={<PrivateRoute component={BillPage} />} />
                        {/* Create new bill page */}
                        <Route path="/bills/create/" element={<PrivateRoute component={BillForm} />} />
                        {/* Create new bill preset page */}
                        <Route path="/bills/preset-create/" element={<PrivateRoute component={BillPresetForm} />} />
                        <Route path="/bills/:id" element={<PrivateRoute component={BillDetails} />} />
                        {/* Bill payment successful page */}
                        <Route path="/bills/success" element={<PrivateRoute component={Success} />} />
                        {/* Bill payment cancelled page */}
                        <Route path="/bills/cancelled" element={<PrivateRoute component={Cancelled} />} />



                        {/* Reservation routes */}
                        {/* Reservation list page */}
                        <Route path="/reservations" element={<PrivateRoute component={ReservationPage} />} />
                        {/* Create new reservation page */}
                        <Route path="/reservations/create" element={<PrivateRoute component={ReservationForm} />} />
                        {/* Reservation details page */}
                        <Route path="/reservations/:id" element={<PrivateRoute component={ReservationDetails} />} />



                        {/* User routes */}
                        {/* User list page */}
                        <Route path="/users" element={<PrivateRoute component={UserPage} />} />
                        {/* Create new user page */}
                        <Route path="/users/create" element={<PrivateRoute component={UserForm} />} />
                        {/* Bulk create new users page */}
                        <Route path="/users/bulk-create" element={<PrivateRoute component={UserBulkForm} />} />
                        {/* User details */}
                        <Route path="/users/:id" element={<PrivateRoute component={UserDetails} />} />


                    </Routes>

                </div>

            </BrowserRouter>

        </div>

    );
}

export default App
