import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicosPage } from './pages/ServicosPage';
import { LoginPage } from './pages/LoginPage';
import { AgendarPage } from './pages/AgendarPage';
import { AgendamentosPage } from './pages/AgendamentosPage';
import { ContatoPage } from './pages/ContatoPage';
import { AdminDashboard } from './pages/AdminDashboard';
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
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'servicos' && (
            <ServicosPage onNavigate={handleNavigate} isLoggedIn={!!user} />
          )}
          {currentPage === 'contato' && <ContatoPage />}
          {currentPage === 'login' && !user && <LoginPage onLogin={handleLogin} />}
          {currentPage === 'agendar' && user && (
            <AgendarPage
              onNavigate={handleNavigate}
              preSelectedServiceId={preSelectedServiceId}
            />
          )}
          {currentPage === 'agendamentos' && user && (
            <AgendamentosPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin' && user && user.role === 'admin' && <AdminDashboard />}
        </Main>

        <Footer onNavigate={handleNavigate} />
      </AppContainer>
    </AppProvider>
  );
}
