import { useAuthContext } from './context/authContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { ToastProvider } from 'd9-toast';
import { useEffect } from 'react';
import { PasswordContextProvider } from './context/passwordContext';

const App = () => {
  const {isAuth, checkToken, loading} = useAuthContext();

  useEffect(() => {
    checkToken()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#16171d',
        color: '#ffffff'
      }}>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <ToastProvider>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/' element={isAuth ?
            <PasswordContextProvider>
              <HomePage /> 
            </PasswordContextProvider> 
            : <Navigate to={"/login"} />} />
        </Routes>
    </ToastProvider>
  )
}

export default App;