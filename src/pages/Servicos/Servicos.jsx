import styled from 'styled-components';
import { ServiceCard } from '../components/ServiceCard';
import { useAppContext } from '../context/AppContext';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 6rem 0;
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
  text-align: center;
  margin-bottom: 5rem;
  animation: fadeInUp 0.8s ease-out;

  .label-container {
    display: inline-block;
    margin-bottom: 1.5rem;
  }

  .line {
    height: 1px;
    width: 3rem;
    background: ${props => props.theme.colors.primary};
    margin: 0 auto 1rem;
  }

  .small-title {
    color: ${props => props.theme.colors.primary};
    font-size: 0.875rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  h1 {
    font-size: 3rem;
    color: white;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 3.75rem;
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
    line-height: 1.75;
    max-width: 48rem;
    margin: 0 auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 0;

  p {
    color: ${props => props.theme.colors.gray400};
    font-size: 1.125rem;
  }
`;

export function ServicosPage({ onNavigate, isLoggedIn }) {
  const { servicos } = useAppContext();

  function handleAgendar(servicoId) {
    if (isLoggedIn) {
      onNavigate('agendar', servicoId);
    } else {
      onNavigate('login');
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <div className="label-container">
            <div className="line" />
            <p className="small-title">Menu de Serviços</p>
          </div>
          <h1>
            Serviços <span className="gradient">Premium</span>
          </h1>
          <p>
            Cada serviço é executado com máxima precisão e atenção aos detalhes,
            utilizando produtos de alta qualidade e técnicas refinadas.
          </p>
        </Header>

        <Grid>
          {servicos.map((servico) => (
            <ServiceCard
              key={servico.id}
              servico={servico}
              onAgendar={() => handleAgendar(servico.id)}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </Grid>

        {servicos.length === 0 && (
          <EmptyState>
            <p>Nenhum serviço disponível no momento.</p>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
}
