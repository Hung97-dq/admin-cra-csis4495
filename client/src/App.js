import { CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import Layout from './scenes/layout';
import Customers from './scenes/customers';
import Admin from './scenes/admin';
import LoginPage from './scenes/loginPage';


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  return (
    <div className="app">
      <BrowserRouter>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
      <Route path="/" element={<LoginPage/>} />
        <Route element={<Layout />}>
          
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/finiancial representative" element={<Customers/>} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
     </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
