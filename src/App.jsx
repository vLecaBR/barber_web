import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './Components/Footer';
import { Home } from './pages/Home/Home';
import { Servicos } from './pages/Servicos/Servicos';
import { Login } from './pages/Login/Login';
import { Agendar } from './pages/Agendar/Agendar';
import { Agendamentos } from './pages/Agendamentos/Agendamentos';
import { Contato } from './pages/Contato/Contato';
import { AdminDashboard } from './pages/ADMIN/AdminDashboard';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const Main = styled.main`
  flex: 1;
`;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({
        id: '1',
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 98765-4321',
        role: 'cliente',
      });
    }
  }, []);

  function handleNavigate(page, servicoId) {
    if (servicoId) {
      setPreSelectedServiceId(servicoId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleLogin(loggedUser, token) {
    setUser(loggedUser);
    localStorage.setItem('token', token);
    setCurrentPage('home');
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('token');
    setCurrentPage('home');
  }

  useEffect(() => {
    if (!user && (currentPage === 'agendar' || currentPage === 'agendamentos' || currentPage === 'admin')) {
      setCurrentPage('login');
    }
    if (user && currentPage === 'admin' && user.role !== 'admin') {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  return (
    <AppProvider>
      <AppContainer>
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />

        <Main>
          {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
          {currentPage === 'servicos' && (
            <Servicos onNavigate={handleNavigate} isLoggedIn={!!user} />
          )}
          {currentPage === 'contato' && <Contato />}
          {currentPage === 'login' && !user && <Login onLogin={handleLogin} />}
          {currentPage === 'agendar' && user && (
            <Agendar
              onNavigate={handleNavigate}
              preSelectedServiceId={preSelectedServiceId}
            />
          )}
          {currentPage === 'agendamentos' && user && (
            <Agendamentos onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin' && user && user.role === 'admin' && <AdminDashboard />}
        </Main>

        <Footer onNavigate={handleNavigate} />
      </AppContainer>
    </AppProvider>
  );
}
