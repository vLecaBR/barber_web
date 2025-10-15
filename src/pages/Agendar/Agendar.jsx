import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar as CalendarIcon, Loader2, Check, Clock, User } from 'lucide-react';
import { Button } from '../../Components/Button';
import { Label, Select, Textarea } from '../../Components/Input';
import { Card, CardContent } from '../../Components/Card';
import { getHorariosDisponiveis, criarAgendamento } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #0f0f0f);
  padding: 6rem 0;
`;

const Content = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
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

const FormCard = styled(Card)`
  max-width: 48rem;
  margin: 0 auto;
`;

const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateButton = styled.button`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.hasValue ? 'white' : props.theme.colors.gray500};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const HorariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const HorarioButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${props => props.selected ? 'linear-gradient(to right, #d4af37, #c9a332)' : '#0a0a0a'};
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : '#2a2a2a'};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.selected ? '#000' : 'white'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    ${props => !props.selected && 'background: rgba(212, 175, 55, 0.1);'}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.gray400};

  svg {
    width: 2rem;
    height: 2rem;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  text-align: center;

  svg {
    width: 4rem;
    height: 4rem;
    color: rgb(52, 211, 153);
    margin: 0 auto 1rem;
  }

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.gray400};
  }
`;

export function Agendar({ onNavigate, preSelectedServiceId }) {
  const { servicos, barbeiros } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [selectedServiceId, setSelectedServiceId] = useState(preSelectedServiceId || '');
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  useEffect(() => {
    if (selectedBarberId && selectedDate && selectedServiceId) {
      fetchHorarios();
    }
  }, [selectedBarberId, selectedDate, selectedServiceId]);

  async function fetchHorarios() {
    setLoadingHorarios(true);
    try {
      const horarios = await getHorariosDisponiveis(selectedBarberId, selectedServiceId, selectedDate);
      setHorariosDisponiveis(horarios);
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
    } finally {
      setLoadingHorarios(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!selectedServiceId || !selectedBarberId || !selectedDate || !selectedTime) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      await criarAgendamento({
        profissionalId: selectedBarberId,
        servicoId: selectedServiceId,
        dataHora: `${selectedDate}T${selectedTime}:00`,
        observacoes,
      });

      setSuccess(true);
      setTimeout(() => {
        onNavigate('agendamentos');
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('Erro ao criar agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Container>
        <Content>
          <FormCard>
            <CardContent>
              <SuccessMessage>
                <Check />
                <h3>Agendamento Confirmado!</h3>
                <p>Você será redirecionado para seus agendamentos...</p>
              </SuccessMessage>
            </CardContent>
          </FormCard>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <p className="small-title">Reserve seu Horário</p>
          <h1>
            Agendar <span className="gradient">Serviço</span>
          </h1>
          <p>Escolha o melhor horário para você</p>
        </Header>

        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Serviço *</Label>
              <Select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                required
              >
                <option value="">Selecione um serviço</option>
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {servico.nome} - R$ {servico.preco.toFixed(2)} ({servico.duracao} min)
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Barbeiro *</Label>
              <Select
                value={selectedBarberId}
                onChange={(e) => setSelectedBarberId(e.target.value)}
                required
              >
                <option value="">Selecione um barbeiro</option>
                {barbeiros.map((barbeiro) => (
                  <option key={barbeiro.id} value={barbeiro.id}>
                    {barbeiro.nome}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Data *</Label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  height: '3.5rem',
                  padding: '0 1rem',
                  background: '#0a0a0a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1rem',
                }}
                required
              />
            </FormGroup>

            {selectedBarberId && selectedDate && selectedServiceId && (
              <FormGroup>
                <Label>Horário Disponível *</Label>
                {loadingHorarios ? (
                  <LoadingState>
                    <Loader2 />
                    <p>Carregando horários...</p>
                  </LoadingState>
                ) : (
                  <HorariosGrid>
                    {horariosDisponiveis.length > 0 ? (
                      horariosDisponiveis.map((horario) => (
                        <HorarioButton
                          key={horario}
                          type="button"
                          selected={selectedTime === horario}
                          onClick={() => setSelectedTime(horario)}
                        >
                          <Clock style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.25rem' }} />
                          {horario}
                        </HorarioButton>
                      ))
                    ) : (
                      <p style={{ color: '#999', gridColumn: '1 / -1', textAlign: 'center' }}>
                        Nenhum horário disponível para esta data
                      </p>
                    )}
                  </HorariosGrid>
                )}
              </FormGroup>
            )}

            <FormGroup>
              <Label>Observações (opcional)</Label>
              <Textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Alguma preferência ou observação especial?"
                minHeight="120px"
              />
            </FormGroup>

            <Button
              type="submit"
              disabled={loading || !selectedServiceId || !selectedBarberId || !selectedDate || !selectedTime}
              style={{ width: '100%', height: '3.5rem', marginTop: '1rem' }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
                  Confirmando...
                </>
              ) : (
                'Confirmar Agendamento'
              )}
            </Button>
          </Form>
        </FormCard>
      </Content>
    </Container>
  );
}
