import styled from 'styled-components';
import { Clock } from 'lucide-react';
import { Button } from './Button';

const CardWrapper = styled.div`
  position: relative;
`;

const Card = styled.div`
  position: relative;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid #2a2a2a;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-0.5rem);
    box-shadow: ${props => props.theme.shadows.luxury};
  }
`;

const CornerAccent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(to bottom right, rgba(212, 175, 55, 0.2), transparent);
  border-radius: 0 1rem 0 0;
  opacity: 0;
  transition: opacity 0.5s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s;

  ${Card}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const Divider = styled.div`
  width: 3rem;
  height: 2px;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, transparent);
`;

const Description = styled.p`
  color: ${props => props.theme.colors.gray400};
  line-height: 1.75;
  margin-bottom: 1.5rem;
  min-height: 60px;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #2a2a2a;
`;

const DurationBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.gray400};
  font-size: 0.875rem;

  .icon-wrapper {
    width: 2rem;
    height: 2rem;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const Price = styled.div`
  text-align: right;

  .amount {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const BottomAccent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}, transparent);
  opacity: 0;
  transition: opacity 0.5s;

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

export function ServiceCard({ servico, onAgendar, isLoggedIn }) {
  return (
    <CardWrapper>
      <Card>
        <CornerAccent />
        <CardContent>
          <Header>
            <Title>{servico.nome}</Title>
            <Divider />
          </Header>

          <Description>{servico.descricao}</Description>

          <InfoSection>
            <DurationBadge>
              <div className="icon-wrapper">
                <Clock />
              </div>
              <span>{servico.duracao} min</span>
            </DurationBadge>
            <Price>
              <div className="amount">R$ {servico.preco.toFixed(2)}</div>
            </Price>
          </InfoSection>

          <Button
            onClick={onAgendar}
            disabled={!isLoggedIn}
            style={{ width: '100%', padding: '1.5rem' }}
          >
            {isLoggedIn ? 'Reservar Horário' : 'Faça login para agendar'}
          </Button>
        </CardContent>
      </Card>
      <BottomAccent />
    </CardWrapper>
  );
}
