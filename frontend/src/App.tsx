import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import { AdminSettings } from './pages/Admin/Settings/AdminSettings.tsx';
import AdminUsers from './pages/Admin/Users/AdminUsers.tsx';

import { useContext } from "react";
import { useLogout } from "@/hooks/useLogout"
import { useAuthContext } from "@/hooks/useAuthContext.tsx"
import { MemberDashboard } from '@/pages/Members/MemberDashboard.tsx';
import MemberPayments from "@/pages/Members/Payments/MemberPayments.tsx";
import MemberAnnouncements from './pages/Members/Announcements/MemberAnnouncements.tsx';
import { MemberSettings } from './pages/Members/MemberSettings.tsx';
import AdminArchives from './pages/Admin/Archives/AdminArchives.tsx';

// Bills Imports

// Admin Bills Page Import
import AdminBills from "@/pages/Bills/Bills.tsx";

// Reservations Imports

// Admin Reservations

// Admin Reservation Details Import
import { AdminReservation } from '@/pages/Admin/Reservations/AdminReservation.tsx'

// Admin Reservations Page Import
import AdminReservations from '@/pages/Admin/Reservations/AdminReservations.tsx';

// Admin Reservations Create Import
// import { AdminReservationForm } from './pages/Admin/Reservations/AdminReservationForm.tsx';



// Member Reservation Details Import
import { MemberReservation } from '@/pages/Members/Reservations/MemberReservation.tsx'

// Member Reservations Page Import
import MemberReservations from '@/pages/Members/Reservations/MemberReservations.tsx';

// Member Reservations Create Import
import { MemberReservationForm } from '@/pages/Members/Reservations/MemberReservationForm.tsx';

// Member Reservations Edit Import
import { MemberReservationEditForm } from '@/pages/Members/Reservations/MemberReservationEdit.tsx';
import { AdminReservationEditForm } from './pages/Admin/Reservations/AdminReservationEdit.tsx';
import { Dashboard } from '@/pages/Dashboard.tsx';
import Announcements from '@/pages/Announcements/Announcements.tsx';
import Reservations from './pages/Reservations/Reservations.tsx';
import { ReservationPage } from './pages/Reservations/ReservationPage.tsx';
import { BillPage } from './pages/Bills/BillPage.tsx';
import Bills from '@/pages/Bills/Bills.tsx';
import Success from '@/pages/PaymentSuccess.tsx';
import Cancelled from '@/pages/PaymentCancelled.tsx';





function App() {

    const { logout } = useLogout()
    const { user } = useAuthContext()



    return (

        <div className="App">

            <BrowserRouter>

                <div className='Pages'>

                    <Routes>

                        <Route
                            path="/"
                            element={<Home />}
                        ></Route>

                        <Route
                            path="/home"
                            element={<Home />}
                        >

                        </Route>

                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Dashboard />}
                        >
                        </Route>

                        <Route
                            path="/dashboard"
                            element={!user ? <Login /> : <Dashboard />}
                        >
                        </Route>

                        <Route
                            path="/announcements"
                            element={!user ? <Login /> : <Announcements />}
                        >
                        </Route>

                        <Route
                            path="/reservations"
                            element={!user ? <Login /> : <Reservations />}
                        >
                        </Route>

                        <Route
                            path="/reservations/form"
                            element={ !user ? <Login /> : <Reservations />}
                        >
                        </Route>

                        <Route
                            path="/reservations/details/:id"
                            element={ !user ? <Login /> : <ReservationPage />}
                        >
                        </Route>

                        <Route
                            path="/bills"
                            element={ !user ? <Login /> : <Bills />}
                        >
                        </Route>

                        <Route
                            path="/bills/form"
                            element={ !user ? <Login /> : <Bills />}
                        >
                        </Route>

                        <Route
                            path="/bills/details/:id"
                            element={ !user ? <Login /> : <BillPage />}
                        >
                        </Route>

                        <Route
                            path="/bills/success"
                            element={ !user ? <Login /> : <Success />}
                        >
                        </Route>

                        <Route
                            path="/bills/cancelled"
                            element={ !user ? <Login /> : <Cancelled />}
                        >
                        </Route>

                        {/* If logged in */}
                        {user &&
                            (
                                <>
                                    {/* If User is Unit Owner */}
                                    {user.role == "Unit Owner" &&
                                        (
                                            <>

                                                <Route
                                                    path="/dashboard"
                                                    element={<MemberDashboard />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/bills"
                                                    element={<MemberPayments />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/settings"
                                                    element={<MemberSettings />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/announcements"
                                                    element={<MemberAnnouncements />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/reservations"
                                                    element={<MemberReservations />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/reservations/details/:id"
                                                    element={<MemberReservation />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/reservations/form"
                                                    element={<MemberReservationForm />}
                                                >

                                                </Route>

                                                <Route
                                                    path="/member/reservations/details/edit/:id"
                                                    element={<MemberReservationEditForm />}
                                                >

                                                </Route>

                                            </>
                                        )
                                    }





                                    {/* If User is Admin, etc. */}
                                    {
                                        user.role != "Unit Owner" && (
                                            <>

                                                {/* Admin Account Details Page */}
                                                <Route
                                                    path="/settings"
                                                    element={<AdminSettings />}
                                                >
                                                </Route>



                                                {/* Admin Bill-related Pages */}
                                                {/* Admin All Unarchived Bills List */}
                                                <Route
                                                    path="/admin/bills"
                                                    element={<AdminBills />}
                                                >
                                                </Route>

                                                {/* Admin Create Bill Page */}
                                                <Route
                                                    path="/admin/bills/create"
                                                    element={<AdminBills />}
                                                >
                                                </Route>

                                                {/* Admin Bill Details Page */}
                                                <Route
                                                    path="/admin/bills/details"
                                                    element={<AdminBills />}
                                                >
                                                </Route>




                                                <Route
                                                    path="/users"
                                                    element={<AdminUsers />}
                                                >
                                                </Route>

                                                <Route
                                                    path="/admin/announcements"
                                                    element={<Announcements />}
                                                >
                                                </Route>

                                                <Route
                                                    path="/archives"
                                                    element={<AdminArchives />}
                                                >
                                                </Route>

                                                <Route
                                                    path="/reservations"
                                                    element={<AdminReservations />}
                                                >
                                                </Route>

                                                <Route
                                                    path="/reservations/details/:id"
                                                    element={<AdminReservation />}
                                                >
                                                </Route>

                                                {/* <Route
                                                    path="/admin/reservations/form"
                                                    element={<AdminReservationForm />}
                                                >
                                                </Route> */}

                                                <Route
                                                    path="/reservations/details/edit/:id"
                                                    element={<AdminReservationEditForm />}
                                                >

                                                </Route>

                                            </>
                                        )
                                    }
                                </>
                            )
                        }





                        {/* If User is not logged in, redirect to login page */}
                        {!user &&
                            (
                                <>

                                    <Route
                                        path="/admin/dashboard"
                                        element={user ? <Dashboard /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/admin/bills"
                                        element={user ? <AdminBills /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/admin/settings"
                                        element={user ? <AdminSettings /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/admin/users"
                                        element={user ? <AdminUsers /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/admin/archives"
                                        element={user ? <AdminArchives /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/reservations"
                                        element={<AdminReservations />}
                                    >

                                    </Route>

                                    <Route
                                        path="/reservations/details/:id"
                                        element={user ? <AdminReservation /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    


                                    <Route
                                        path="/reservations/details/edit/:id"
                                        element={user ? <AdminReservationEditForm /> : <Navigate to="/login" />}
                                    >

                                    </Route>





                                    <Route
                                        path="/member/dashboard"
                                        element={user ? <MemberDashboard /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/bills"
                                        element={user ? <MemberPayments /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/settings"
                                        element={user ? <MemberSettings /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/announcements"
                                        element={user ? <MemberAnnouncements /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/reservations/details/:id"
                                        element={user ? <MemberReservation /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/reservations/form"
                                        element={user ? <MemberReservationForm /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                    <Route
                                        path="/member/reservations/details/edit/:id"
                                        element={user ? <MemberReservationEditForm /> : <Navigate to="/login" />}
                                    >

                                    </Route>

                                </>
                            )
                        }



                    </Routes>

                </div>

            </BrowserRouter>

        </div>

    );
}

export default App
