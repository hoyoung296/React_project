import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';

function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login', '/signup', '/*'];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);
  return (
    <div>
      {!hideHeaderFooter && <Header/>}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {!hideHeaderFooter && <Footer/>}
    </div>
  );
}

export default App;
