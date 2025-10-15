// Serviço de API para consumir o backend
const BASE_URL = 'http://localhost:8080/api';

async function fetchAPI(endpoint, options) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options?.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// ===== AUTENTICAÇÃO =====

export async function login(email, senha) {
  // MOCK - Remove quando conectar ao backend real
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAdmin = email === 'admin@barbearia.com';
      
      resolve({
        token: 'mock-jwt-token-12345',
        user: {
          id: isAdmin ? '999' : '1',
          nome: isAdmin ? 'Administrador' : 'João Silva',
          email,
          telefone: '(11) 98765-4321',
          role: isAdmin ? 'admin' : 'cliente',
        },
      });
    }, 1000);
  });
}

export async function cadastro(dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token-12345',
        user: {
          id: '2',
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          role: 'cliente',
        },
      });
    }, 1000);
  });
}

// ===== HORÁRIOS DISPONÍVEIS =====

export async function getHorariosDisponiveis(profissionalId, servicoId, data) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
      ]);
    }, 800);
  });
}

export async function criarAgendamento(dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: String(Date.now()),
        clienteId: '1',
        clienteNome: 'João Silva',
        profissionalId: dados.profissionalId,
        profissionalNome: 'Carlos Oliveira',
        servicoId: dados.servicoId,
        servicoNome: 'Corte Masculino',
        dataHora: dados.dataHora,
        status: 'pendente',
        observacoes: dados.observacoes,
      });
    }, 1000);
  });
}

export async function cancelarAgendamento(agendamentoId) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
}

export async function getAgendamentos(userId) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          data: '2025-10-20',
          horario: '14:00',
          status: 'confirmado',
          observacoes: 'Quero um corte social moderno',
          servico: {
            id: '1',
            nome: 'Corte Premium',
            preco: 80.0,
            duracao: 45,
          },
          barbeiro: {
            id: '1',
            nome: 'Carlos Oliveira',
          },
        },
        {
          id: '2',
          data: '2025-10-15',
          horario: '10:30',
          status: 'concluido',
          observacoes: '',
          servico: {
            id: '3',
            nome: 'Corte + Barba',
            preco: 120.0,
            duracao: 60,
          },
          barbeiro: {
            id: '2',
            nome: 'Rafael Santos',
          },
        },
      ]);
    }, 800);
  });
}

// ===== ADMIN - SERVIÇOS =====

export async function criarServico(dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: String(Date.now()),
        ...dados,
      });
    }, 800);
  });
}

export async function atualizarServico(id, dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...dados,
      });
    }, 800);
  });
}

export async function deletarServico(id) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

// ===== ADMIN - BARBEIROS =====

export async function criarBarbeiro(dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: String(Date.now()),
        ...dados,
      });
    }, 800);
  });
}

export async function atualizarBarbeiro(id, dados) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...dados,
      });
    }, 800);
  });
}

export async function deletarBarbeiro(id) {
  // MOCK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

// ===== ADMIN - TODOS AGENDAMENTOS =====

export async function getAllAgendamentos() {
  // MOCK - Retorna todos os agendamentos (para admin)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          data: '2025-10-20',
          horario: '14:00',
          status: 'confirmado',
          servico: {
            nome: 'Corte Premium',
            preco: 80.0,
          },
          barbeiro: {
            nome: 'Carlos Oliveira',
          },
          cliente: {
            nome: 'João Silva',
            telefone: '(11) 98765-4321',
          },
        },
        {
          id: '2',
          data: '2025-10-20',
          horario: '15:30',
          status: 'pendente',
          servico: {
            nome: 'Barba Completa',
            preco: 60.0,
          },
          barbeiro: {
            nome: 'Rafael Santos',
          },
          cliente: {
            nome: 'Pedro Costa',
            telefone: '(11) 99876-5432',
          },
        },
      ]);
    }, 800);
  });
}
