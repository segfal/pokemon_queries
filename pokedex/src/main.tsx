import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import AppRoutes from './App.tsx';
import GlobalStyles from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>  {/* Wrap the app in BrowserRouter */}
    <GlobalStyles />
    <AppRoutes />
  </Router>
);
