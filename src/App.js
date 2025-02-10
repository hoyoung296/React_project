import { Routes, Route, useLocation } from 'react-router-dom';
import routes from './routes';
import HeaderCon from './containers/common/HeaderCon';
import FooterCon from './containers/common/FooterCon';
import './css/main.css';

function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/signup', '/*'];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);
  return (
    <div className="appBody">
      {!hideHeaderFooter && <HeaderCon />}
      <Routes className="mainContent">
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {!hideHeaderFooter && <FooterCon className="footerContent" />}
    </div>
  );
}

export default App;
