import { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [servicos, setServicos] = useState([
    {
      id: '1',
      nome: 'Corte Premium',
      descricao: 'Corte tradicional ou moderno com acabamento profissional e produtos premium',
      duracao: 45,
      preco: 80,
    },
    {
      id: '2',
      nome: 'Barba Completa',
      descricao: 'Design, alinhamento e hidratação profunda da barba com produtos importados',
      duracao: 30,
      preco: 60,
    },
    {
      id: '3',
      nome: 'Corte + Barba',
      descricao: 'Pacote completo: corte de cabelo, barba e tratamento capilar premium',
      duracao: 60,
      preco: 120,
    },
    {
      id: '4',
      nome: 'Tratamento Capilar',
      descricao: 'Hidratação profunda e tratamento especializado para os fios',
      duracao: 40,
      preco: 90,
    },
  ]);

  const [barbeiros, setBarbeiros] = useState([
    {
      id: '1',
      nome: 'Carlos Oliveira',
      especialidade: 'Cortes Clássicos e Modernos',
      telefone: '(11) 98765-1111',
    },
    {
      id: '2',
      nome: 'Rafael Santos',
      especialidade: 'Barbas e Design',
      telefone: '(11) 98765-2222',
    },
    {
      id: '3',
      nome: 'Lucas Martins',
      especialidade: 'Tratamentos Capilares',
      telefone: '(11) 98765-3333',
    },
  ]);

  const [agendamentos, setAgendamentos] = useState([]);

  async function refreshData() {
    // Função para recarregar dados após mudanças no admin
    // Em produção, isso faria chamadas à API
    return Promise.resolve();
  }

  return (
    <AppContext.Provider
      value={{
        servicos,
        setServicos,
        barbeiros,
        setBarbeiros,
        profissionais: barbeiros, // Alias para compatibilidade
        setProfissionais: setBarbeiros,
        agendamentos,
        setAgendamentos,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
