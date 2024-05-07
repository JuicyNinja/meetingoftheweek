import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import MainPage from "../components/mainpage/MainPage";
import AdminDashboard from "../pages/AdminDashboard";
import UsersDashboard from "../pages/UsersDashboard";
import Groups from "../pages/Groups";
import OwnerDashboard from "../pages/OwnerDashboard";
import Meeting from "../pages/Meeting";
import ReferralDashboard from "../pages/ReferralDashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";
import UserProfileDashboard from "../pages/UserProfileDashboard";
import Profile from "../pages/Profile";
import UserViewGroup from "../pages/UserViewGroup";
import UserViewSingleGroup from "../pages/UserViewSingleGroup";
import UserViewAllMeetings from "../pages/UserViewAllMeetings";
import UserViewSingleMeetings from "../pages/UserViewSingleMeeting";
import PrivateRoute from "../components/common/PrivateRoutes";
import { AuthProvider, useAuth} from "../components/common/AuthProvider";
import { useEffect } from "react";

const logoutUser = () => {
  console.log("fdskfjdsf");
  const {logout} = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
}

const rootRouter = createBrowserRouter(
  createRoutesFromElements(
    <AuthProvider>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" action={logoutUser} />
      <Route element={<PrivateRoute />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} /></Route>
      
    </AuthProvider>
  )
);
// const rootRouter = createBrowserRouter([
//     {
//         path:'/',
//         element: <LandingPage />,
//     },
//     {
//         path:'/signin',
//         element: <SignIn />
//     },
//     {
//         path:'/signup',
//         element: <SignUp />
//     },
//     {
//         path:'/admin/dashboard',
//         element: <AdminDashboard />,
//     },
//     {
//         path:'/admin/profiledashboard',
//         element: <UserProfileDashboard />,
//     },

//     {
//         path:'/user/dashboard',
//         element: <UsersDashboard />
//     },
//     {
//         path:'/user/profile',
//         element: <Profile />
//     },
//     {
//         path:'/user/group',
//         element: <UserViewGroup />
//     },
//     {
//         path:'/user/singlegroup',
//         element: <UserViewSingleGroup />
//     },
//     {
//         path:'/user/allmeeting',
//         element: <UserViewAllMeetings />
//     },
//     {
//         path:'/user/singlemeeting',
//         element: <UserViewSingleMeetings />
//     },

//     {
//         path:'/meeting',
//         element: <Meeting />
//     },
//     {
//         path:'/owner/dashboard',
//         element: <OwnerDashboard />
//     },
//     {
//         path:'/groups',
//         element: <Groups />
//     },
//     {
//         path:'/referral/dashboard',
//         element: <ReferralDashboard />
//     }
// ]);

export default rootRouter;
