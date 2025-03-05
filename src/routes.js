import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import TicketDate from './pages/TicketDate';
import TicketSeat from './pages/TicketSeat';
import PayMent from './pages/PayMent';
import TicketDone from './pages/TicketDone';
import MyTicket from './pages/MyTicket';
import MyReview from './pages/MyReview';
import InfoPwd from './pages/InfoPwd';
import Info from './pages/info';
import NotFound from './pages/NotFound';
import AdminMovie from './pages/AdminMovie';
import AdminMember from './pages/AdminMember';
import AdminPayment from './pages/AdminPayment';
import AdminSchedule from './pages/AdminSchedule';
import AdminMain from './pages/AdminMain';
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute';
import OAuthCallback from './components/login/OAuthCallback';
import LoginHandler from './components/login/LoginHandler';
import ProtectedRoute from './components/login/ProtectedRoute';

const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/login/oauth2/callback/kakao', element: <LoginHandler/> },
    { path: '/search', element: <Search /> },
    { path: '/signup', element: <SignUp /> },

    { path: '/ticket_date', element: <ProtectedRoute element={<TicketDate />} /> },
    { path: '/ticket_seat', element: <ProtectedRoute element={<TicketSeat />} /> },
    { path: '/payment', element: <ProtectedRoute element={<PayMent />} /> },
    { path: '/ticket_done', element: <ProtectedRoute element={<TicketDone />} /> },
    { path: '/myTicket', element: <ProtectedRoute element={<MyTicket />} /> },
    { path: '/myReview', element: <ProtectedRoute element={<MyReview />} /> },
    { path: '/info_pwd', element: <ProtectedRoute element={<InfoPwd />} /> },
    { path: '/info', element: <ProtectedRoute element={<Info />} /> },

    { path: '*', element: <NotFound /> },

    { path: '/adminMain' , element : <AdminMain />},
    { path: '/adminMovie', element: <AdminProtectedRoute element={<AdminMovie />} /> },
    { path: '/adminMember', element: <AdminProtectedRoute element={<AdminMember />} /> },
    { path: '/adminSchedule', element: <AdminProtectedRoute element={<AdminSchedule />} /> },
    { path: '/adminPayment', element: <AdminProtectedRoute element={<AdminPayment />} /> }
];

export default routes;