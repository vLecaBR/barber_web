import { useState } from 'react';
import styled from 'styled-components';
import { Plus, Edit, Trash2, Users, Calendar, Scissors, Save, X } from 'lucide-react';
import { Button } from '../../Components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/Card';
import { Input, Label, Textarea } from '../../Components/Input';
import { Modal } from '../../Components/Modal';
import { useAppContext } from '../../context/AppContext';
import {
  criarServico,
  atualizarServico,
  deletarServico,
  criarBarbeiro,
  atualizarBarbeiro,
  deletarBarbeiro,
  getAllAgendamentos,
} from '../../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #0f0f0f);
  padding: 6rem 0 3rem;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out;

  h1 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }

    .gradient {
      background: ${props => props.theme.gradients.gold};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: ${props => props.theme.colors.gray400};
    font-size: 1.125rem;
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabsList = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #2a2a2a;
  margin-bottom: 2rem;
  overflow-x: auto;
`;

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray400};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.active ? props.theme.colors.primary : 'white'};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ItemCard = styled(Card)`
  transition: all 0.3s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-0.25rem);
  }
`;

const ItemHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #2a2a2a;

  h3 {
    color: white;
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${props => props.theme.colors.gray400};
    font-size: 0.875rem;
  }
`;

const ItemBody = styled.div`
  padding: 1.5rem;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;

    .label {
      color: ${props => props.theme.colors.gray400};
    }

    .value {
      color: white;
      font-weight: 500;
    }
  }
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #2a2a2a;
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export function AdminDashboard() {
  const { servicos, barbeiros, refreshData } = useAppContext();
  const [activeTab, setActiveTab] = useState('servicos');
  
  // Modals
  const [servicoModalOpen, setServicoModalOpen] = useState(false);
  const [barbeiroModalOpen, setBarbeiroModalOpen] = useState(false);
  const [editingServico, setEditingServico] = useState(null);
  const [editingBarbeiro, setEditingBarbeiro] = useState(null);

  // Form states - Serviço
  const [servicoNome, setServicoNome] = useState('');
  const [servicoDescricao, setServicoDescricao] = useState('');
  const [servicoPreco, setServicoPreco] = useState('');
  const [servicoDuracao, setServicoDuracao] = useState('');

  // Form states - Barbeiro
  const [barbeiroNome, setBarbeiroNome] = useState('');
  const [barbeiroEspecialidade, setBarbeiroEspecialidade] = useState('');
  const [barbeiroTelefone, setBarbeiroTelefone] = useState('');

  function openServicoModal(servico = null) {
    if (servico) {
      setEditingServico(servico);
      setServicoNome(servico.nome);
      setServicoDescricao(servico.descricao);
      setServicoPreco(servico.preco.toString());
      setServicoDuracao(servico.duracao.toString());
    } else {
      setEditingServico(null);
      setServicoNome('');
      setServicoDescricao('');
      setServicoPreco('');
      setServicoDuracao('');
    }
    setServicoModalOpen(true);
  }

  function openBarbeiroModal(barbeiro = null) {
    if (barbeiro) {
      setEditingBarbeiro(barbeiro);
      setBarbeiroNome(barbeiro.nome);
      setBarbeiroEspecialidade(barbeiro.especialidade || '');
      setBarbeiroTelefone(barbeiro.telefone || '');
    } else {
      setEditingBarbeiro(null);
      setBarbeiroNome('');
      setBarbeiroEspecialidade('');
      setBarbeiroTelefone('');
    }
    setBarbeiroModalOpen(true);
  }

  async function handleServicoSubmit(e) {
    e.preventDefault();
    
    const data = {
      nome: servicoNome,
      descricao: servicoDescricao,
      preco: parseFloat(servicoPreco),
      duracao: parseInt(servicoDuracao),
    };

    try {
      if (editingServico) {
        await atualizarServico(editingServico.id, data);
      } else {
        await criarServico(data);
      }
      await refreshData();
      setServicoModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço');
    }
  }

  async function handleBarbeiroSubmit(e) {
    e.preventDefault();
    
    const data = {
      nome: barbeiroNome,
      especialidade: barbeiroEspecialidade,
      telefone: barbeiroTelefone,
    };

    try {
      if (editingBarbeiro) {
        await atualizarBarbeiro(editingBarbeiro.id, data);
      } else {
        await criarBarbeiro(data);
      }
      await refreshData();
      setBarbeiroModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar barbeiro:', error);
      alert('Erro ao salvar barbeiro');
    }
  }

  async function handleDeleteServico(id) {
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      try {
        await deletarServico(id);
        await refreshData();
      } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        alert('Erro ao deletar serviço');
      }
    }
  }

  async function handleDeleteBarbeiro(id) {
    if (confirm('Tem certeza que deseja deletar este barbeiro?')) {
      try {
        await deletarBarbeiro(id);
        await refreshData();
      } catch (error) {
        console.error('Erro ao deletar barbeiro:', error);
        alert('Erro ao deletar barbeiro');
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>
            Painel <span className="gradient">Administrativo</span>
          </h1>
          <p>Gerencie serviços, barbeiros e agendamentos</p>
        </Header>

        <TabsContainer>
          <TabsList>
            <TabButton
              active={activeTab === 'servicos'}
              onClick={() => setActiveTab('servicos')}
            >
              <Scissors />
              Serviços
            </TabButton>
            <TabButton
              active={activeTab === 'barbeiros'}
              onClick={() => setActiveTab('barbeiros')}
            >
              <Users />
              Barbeiros
            </TabButton>
            <TabButton
              active={activeTab === 'agenda'}
              onClick={() => setActiveTab('agenda')}
            >
              <Calendar />
              Agenda
            </TabButton>
          </TabsList>
        </TabsContainer>

        {activeTab === 'servicos' && (
          <>
            <HeaderActions>
              <Button onClick={() => openServicoModal()}>
                <Plus style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                Novo Serviço
              </Button>
            </HeaderActions>

            <Grid>
              {servicos.map((servico) => (
                <ItemCard key={servico.id}>
                  <ItemHeader>
                    <h3>{servico.nome}</h3>
                    <p>{servico.descricao}</p>
                  </ItemHeader>
                  <ItemBody>
                    <ItemInfo>
                      <div className="info-row">
                        <span className="label">Preço:</span>
                        <span className="value">R$ {servico.preco.toFixed(2)}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Duração:</span>
                        <span className="value">{servico.duracao} min</span>
                      </div>
                    </ItemInfo>
                    <ItemActions>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openServicoModal(servico)}
                        style={{ flex: 1 }}
                      >
                        <Edit style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteServico(servico.id)}
                        style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <Trash2 style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        Deletar
                      </Button>
                    </ItemActions>
                  </ItemBody>
                </ItemCard>
              ))}
            </Grid>
          </>
        )}

        {activeTab === 'barbeiros' && (
          <>
            <HeaderActions>
              <Button onClick={() => openBarbeiroModal()}>
                <Plus style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                Novo Barbeiro
              </Button>
            </HeaderActions>

            <Grid>
              {barbeiros.map((barbeiro) => (
                <ItemCard key={barbeiro.id}>
                  <ItemHeader>
                    <h3>{barbeiro.nome}</h3>
                    <p>{barbeiro.especialidade || 'Barbeiro'}</p>
                  </ItemHeader>
                  <ItemBody>
                    <ItemInfo>
                      <div className="info-row">
                        <span className="label">Telefone:</span>
                        <span className="value">{barbeiro.telefone || 'Não informado'}</span>
                      </div>
                    </ItemInfo>
                    <ItemActions>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openBarbeiroModal(barbeiro)}
                        style={{ flex: 1 }}
                      >
                        <Edit style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBarbeiro(barbeiro.id)}
                        style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <Trash2 style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        Deletar
                      </Button>
                    </ItemActions>
                  </ItemBody>
                </ItemCard>
              ))}
            </Grid>
          </>
        )}

        {activeTab === 'agenda' && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: '#999' }}>
            <Calendar style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', color: '#d4af37' }} />
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Visualização de Agenda</h3>
            <p>Em desenvolvimento - Use o backend para consultar todos os agendamentos</p>
          </div>
        )}

        {/* Modal Serviço */}
        <Modal
          open={servicoModalOpen}
          onClose={() => setServicoModalOpen(false)}
          title={editingServico ? 'Editar Serviço' : 'Novo Serviço'}
          maxWidth="600px"
        >
          <Form onSubmit={handleServicoSubmit}>
            <FormGroup>
              <Label>Nome do Serviço *</Label>
              <Input
                value={servicoNome}
                onChange={(e) => setServicoNome(e.target.value)}
                placeholder="Ex: Corte Premium"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Descrição *</Label>
              <Textarea
                value={servicoDescricao}
                onChange={(e) => setServicoDescricao(e.target.value)}
                placeholder="Descreva o serviço..."
                minHeight="100px"
                required
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Preço (R$) *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={servicoPreco}
                  onChange={(e) => setServicoPreco(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Duração (min) *</Label>
                <Input
                  type="number"
                  value={servicoDuracao}
                  onChange={(e) => setServicoDuracao(e.target.value)}
                  placeholder="30"
                  required
                />
              </FormGroup>
            </FormRow>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setServicoModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                <Save style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                {editingServico ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Modal Barbeiro */}
        <Modal
          open={barbeiroModalOpen}
          onClose={() => setBarbeiroModalOpen(false)}
          title={editingBarbeiro ? 'Editar Barbeiro' : 'Novo Barbeiro'}
          maxWidth="600px"
        >
          <Form onSubmit={handleBarbeiroSubmit}>
            <FormGroup>
              <Label>Nome Completo *</Label>
              <Input
                value={barbeiroNome}
                onChange={(e) => setBarbeiroNome(e.target.value)}
                placeholder="Ex: João Silva"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Especialidade</Label>
              <Input
                value={barbeiroEspecialidade}
                onChange={(e) => setBarbeiroEspecialidade(e.target.value)}
                placeholder="Ex: Cortes clássicos"
              />
            </FormGroup>

            <FormGroup>
              <Label>Telefone</Label>
              <Input
                type="tel"
                value={barbeiroTelefone}
                onChange={(e) => setBarbeiroTelefone(e.target.value)}
                placeholder="(11) 98765-4321"
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setBarbeiroModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                <Save style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                {editingBarbeiro ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </Form>
        </Modal>
      </Content>
    </Container>
  );
}
