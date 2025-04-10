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
import LoginHandler from './components/login/LoginHandler';
import ProtectedRoute from './components/login/ProtectedRoute';
import SetPassword from './components/login/SetPassword';
import KakaoLogoutCallback from './components/login/KakaoLogoutCallback';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';

const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/login/set-password', element: <SetPassword /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/login/oauth2/callback/kakao', element: <LoginHandler/> },
    { path: '/logout-callback', element: <KakaoLogoutCallback/> },
    { path: '/search', element: <Search /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/find/id', element: <FindId /> },
    { path: '/find/pw', element: <FindPw /> },

    { path: '/ticket/date', element: <ProtectedRoute element={<TicketDate />} /> },
    { path: '/ticket/seat', element: <ProtectedRoute element={<TicketSeat />} /> },
    { path: '/payment', element: <ProtectedRoute element={<PayMent />} /> },
    { path: '/ticket/done', element: <ProtectedRoute element={<TicketDone />} /> },
    { path: '/mypage/ticket', element: <ProtectedRoute element={<MyTicket />} /> },
    { path: '/mypage/review', element: <ProtectedRoute element={<MyReview />} /> },
    { path: '/mypage/info/confirm', element: <ProtectedRoute element={<InfoPwd />} /> },
    { path: '/mypage/info', element: <ProtectedRoute element={<Info />} /> },

    { path: '*', element: <NotFound /> },

    { path: '/admin/login' , element : <AdminMain />},
    { path: '/admin/movie', element: <AdminProtectedRoute element={<AdminMovie />} /> },
    { path: '/admin/member', element: <AdminProtectedRoute element={<AdminMember />} /> },
    { path: '/admin/schedule', element: <AdminProtectedRoute element={<AdminSchedule />} /> },
    { path: '/admin/payment', element: <AdminProtectedRoute element={<AdminPayment />} /> },
];

export default routes;