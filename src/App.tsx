
import './App.css'
import Layout from "./components/pages/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import UserManagement from "./components/pages/users/UserManagementPage.tsx";
import Home from "./components/pages/Home.tsx";
import MajorsCoursesPage from "./components/pages/majorcourses/MajorsCoursesPage.tsx";
import TutorRequests from "./components/pages/toturequest/TutorRequestsPage.tsx";
import NotificationsPage from "./components/pages/NotificationsPage.tsx";
import {LoginPage} from "./components/pages/login/LoginPage.tsx";
import Statistics from "./components/pages/statistics/Statistics.tsx";
import {ForgotPasswordForm} from "./components/pages/login/ForgotPasswordForm.tsx";
import {ResetPasswordForm} from "./components/pages/login/ResetPasswordForm.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";

function App() {

  return (
    <>



        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/admin/reset-password" element={<ResetPasswordForm />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="users" element={<UserManagement />} />
                    <Route path="home" element={<Home />} />
                    <Route path="courses" element={<MajorsCoursesPage />} />
                    <Route path="requests" element={<TutorRequests />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="statistics" element={<Statistics />} />
                </Route>
            </Route>


        </Routes>
    </>
  )
}

export default App
