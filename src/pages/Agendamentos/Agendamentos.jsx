import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar, Clock, User, Loader2, X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { getAgendamentos, cancelarAgendamento } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #0f0f0f);
  padding: 6rem 0 3rem;
`;

const Content = styled.div`
  max-width: 1280px;
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

  .small-title {
    color: ${props => props.theme.colors.primary};
    font-size: 0.875rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

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
  position: relative;

  &:hover {
    color: ${props => props.active ? props.theme.colors.primary : 'white'};
  }

  .count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.5rem;
    margin-left: 0.5rem;
    background: ${props => props.active ? props.theme.colors.primary : '#2a2a2a'};
    color: ${props => props.active ? '#000' : props.theme.colors.gray400};
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

const AgendamentosList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const AgendamentoCard = styled(Card)`
  transition: all 0.3s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-0.25rem);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #2a2a2a;
`;

const TitleSection = styled.div`
  flex: 1;

  h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: ${props => props.theme.colors.gray400};
    font-size: 0.875rem;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: rgba(212, 175, 55, 0.2);
  }

  .icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(212, 175, 55, 0.2);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${props => props.theme.colors.primary};
  }

  .info-content {
    flex: 1;

    .label {
      font-size: 0.75rem;
      color: ${props => props.theme.colors.gray500};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.125rem;
    }

    .value {
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
`;

const ObservationsSection = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(26, 26, 26, 0.5);
  border-radius: 0.75rem;
  border-left: 3px solid ${props => props.theme.colors.primary};

  .label {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.gray500};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .text {
    color: ${props => props.theme.colors.gray300};
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #2a2a2a;
  background: rgba(26, 26, 26, 0.3);
`;

const PriceTag = styled.div`
  .label {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.gray500};
    margin-bottom: 0.25rem;
  }

  .amount {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  color: ${props => props.theme.colors.gray400};

  svg {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  h3 {
    color: white;
    margin-bottom: 0.5rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 1rem;

  .icon-wrapper {
    width: 5rem;
    height: 5rem;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${props => props.theme.colors.primary};
  }

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: ${props => props.theme.colors.gray400};
    margin-bottom: 2rem;
  }
`;

export function Agendamentos({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('proximos');
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  async function fetchAgendamentos() {
    setLoading(true);
    try {
      const data = await getAgendamentos();
      setAgendamentos(data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelar() {
    if (!selectedAgendamento) return;

    setCanceling(true);
    try {
      await cancelarAgendamento(selectedAgendamento.id);
      await fetchAgendamentos();
      setCancelDialogOpen(false);
      setSelectedAgendamento(null);
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento. Tente novamente.');
    } finally {
      setCanceling(false);
    }
  }

  function getStatusBadge(status) {
    const variants = {
      'confirmado': 'success',
      'pendente': 'warning',
      'cancelado': 'error',
      'concluido': 'info',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  }

  const agendamentosProximos = agendamentos.filter(
    (a) => a.status === 'confirmado' || a.status === 'pendente'
  );
  const agendamentosHistorico = agendamentos.filter(
    (a) => a.status === 'concluido' || a.status === 'cancelado'
  );

  const agendamentosFiltrados = activeTab === 'proximos' ? agendamentosProximos : agendamentosHistorico;

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingState>
            <Loader2 />
            <h3>Carregando agendamentos...</h3>
            <p>Aguarde um momento</p>
          </LoadingState>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <p className="small-title">Minha Agenda</p>
          <h1>
            Meus <span className="gradient">Agendamentos</span>
          </h1>
          <p>Gerencie seus horários reservados</p>
        </Header>

        <TabsContainer>
          <TabsList>
            <TabButton
              active={activeTab === 'proximos'}
              onClick={() => setActiveTab('proximos')}
            >
              Próximos
              <span className="count">{agendamentosProximos.length}</span>
            </TabButton>
            <TabButton
              active={activeTab === 'historico'}
              onClick={() => setActiveTab('historico')}
            >
              Histórico
              <span className="count">{agendamentosHistorico.length}</span>
            </TabButton>
          </TabsList>
        </TabsContainer>

        {agendamentosFiltrados.length === 0 ? (
          <EmptyState>
            <div className="icon-wrapper">
              <Calendar />
            </div>
            <h3>Nenhum agendamento encontrado</h3>
            <p>
              {activeTab === 'proximos'
                ? 'Você não possui agendamentos futuros.'
                : 'Seu histórico está vazio.'}
            </p>
            {activeTab === 'proximos' && (
              <Button onClick={() => onNavigate('agendar')}>
                Agendar Novo Horário
              </Button>
            )}
          </EmptyState>
        ) : (
          <AgendamentosList>
            {agendamentosFiltrados.map((agendamento) => (
              <AgendamentoCard key={agendamento.id}>
                <CardHeader>
                  <TitleSection>
                    <h3>{agendamento.servico.nome}</h3>
                    <p className="subtitle">ID: #{agendamento.id.slice(0, 8)}</p>
                  </TitleSection>
                  {getStatusBadge(agendamento.status)}
                </CardHeader>

                <CardBody>
                  <InfoGrid>
                    <InfoItem>
                      <div className="icon-wrapper">
                        <Calendar />
                      </div>
                      <div className="info-content">
                        <div className="label">Data</div>
                        <div className="value">
                          {new Date(agendamento.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <div className="icon-wrapper">
                        <Clock />
                      </div>
                      <div className="info-content">
                        <div className="label">Horário</div>
                        <div className="value">{agendamento.horario}</div>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <div className="icon-wrapper">
                        <User />
                      </div>
                      <div className="info-content">
                        <div className="label">Barbeiro</div>
                        <div className="value">{agendamento.barbeiro.nome}</div>
                      </div>
                    </InfoItem>
                  </InfoGrid>

                  {agendamento.observacoes && (
                    <ObservationsSection>
                      <div className="label">Observações</div>
                      <div className="text">{agendamento.observacoes}</div>
                    </ObservationsSection>
                  )}
                </CardBody>

                <CardFooter>
                  <PriceTag>
                    <div className="label">Valor Total</div>
                    <div className="amount">R$ {agendamento.servico.preco.toFixed(2)}</div>
                  </PriceTag>
                  
                  {agendamento.status === 'confirmado' && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAgendamento(agendamento);
                        setCancelDialogOpen(true);
                      }}
                    >
                      <X style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                      Cancelar
                    </Button>
                  )}
                </CardFooter>
              </AgendamentoCard>
            ))}
          </AgendamentosList>
        )}

        <Modal
          open={cancelDialogOpen}
          onClose={() => !canceling && setCancelDialogOpen(false)}
          title="Cancelar Agendamento"
          description="Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita."
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
                disabled={canceling}
              >
                Manter Agendamento
              </Button>
              <Button
                onClick={handleCancelar}
                disabled={canceling}
                style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)' }}
              >
                {canceling ? (
                  <>
                    <Loader2 style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                    Cancelando...
                  </>
                ) : (
                  'Sim, Cancelar'
                )}
              </Button>
            </>
          }
        >
          {selectedAgendamento && (
            <div style={{ color: '#999' }}>
              <p><strong>Serviço:</strong> {selectedAgendamento.servico.nome}</p>
              <p><strong>Data:</strong> {new Date(selectedAgendamento.data).toLocaleDateString('pt-BR')}</p>
              <p><strong>Horário:</strong> {selectedAgendamento.horario}</p>
              <p><strong>Barbeiro:</strong> {selectedAgendamento.barbeiro.nome}</p>
            </div>
          )}
        </Modal>
      </Content>
    </Container>
  );
}
