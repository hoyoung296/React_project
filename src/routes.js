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

const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/search', element: <Search /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/ticket_date', element: <TicketDate /> },
    { path: '/ticket_seat', element: <TicketSeat /> },
    { path: '/payment', element: <PayMent /> },
    { path: '/ticket_done', element: <TicketDone /> },
    { path: '/myTicket', element: <MyTicket /> },
    { path: '/myReview', element: <MyReview /> },
    { path: '/info_pwd', element: <InfoPwd /> },
    { path: '/info', element: <Info /> },
    { path: '*', element: <NotFound /> },
    { path: '/adminMain' , element : <AdminMain />},
    { path: '/adminMovie', element: <AdminProtectedRoute element={<AdminMovie />} /> },
    { path: '/adminMember', element: <AdminProtectedRoute element={<AdminMember />} /> },
    { path: '/adminSchedule', element: <AdminProtectedRoute element={<AdminSchedule />} /> },
    { path: '/adminPayment', element: <AdminProtectedRoute element={<AdminPayment />} /> }
];

export default routes;