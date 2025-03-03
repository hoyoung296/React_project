import { Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes';
import HeaderCon from './containers/common/HeaderCon';
import './css/main.css';

function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/signup', '/adminMain', '/adminMovie', '/adminMember', '/adminSchedule', '/adminPayment'];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);
  return (
    <div className="appBody">
      {!hideHeaderFooter && <HeaderCon />}
      <div className="mainContent">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default App;