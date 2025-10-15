import styled from 'styled-components';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../../Components/Button';
import { Card } from '../../Components/Card';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #0f0f0f);
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
    max-width: 42rem;
    margin: 0 auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoCard = styled(Card)`
  padding: 2rem;
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  .line {
    height: 1px;
    width: 2rem;
    background: ${props => props.theme.colors.primary};
  }

  h2 {
    color: white;
    font-size: 1.5rem;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: ${props => props.alignStart ? 'flex-start' : 'center'};
  gap: 1rem;
  color: ${props => props.theme.colors.gray400};
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  .icon-wrapper {
    width: 3rem;
    height: 3rem;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.3s;
  }

  &:hover .icon-wrapper {
    background: rgba(212, 175, 55, 0.2);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    .time {
      color: ${props => props.theme.colors.primary};
    }

    .closed {
      color: ${props => props.theme.colors.gray500};
    }
  }
`;

const MapCard = styled(Card)`
  padding: 0.5rem;
  height: 100%;
  min-height: 500px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.75rem;
    min-height: 500px;
  }
`;

const WhatsAppButton = styled(Button)`
  width: 100%;
  height: 3.5rem;
  background: linear-gradient(to right, #25D366, #128C7E);
  margin-top: 2rem;
  border-top: 1px solid #2a2a2a;
  padding-top: 2rem;

  &:hover {
    background: linear-gradient(to right, #128C7E, #25D366);
  }
`;

export function Contato() {
  const whatsappNumber = '5511987654321';
  const whatsappMessage = 'Olá! Gostaria de agendar um horário.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Content>
        <Header>
          <div className="label-container">
            <div className="line" />
            <p className="small-title">Fale Conosco</p>
          </div>
          <h1>
            Visite Nossa <span className="gradient">Barbearia</span>
          </h1>
          <p>
            Estamos prontos para proporcionar a melhor experiência em grooming masculino
          </p>
        </Header>

        <Grid>
          <div>
            <InfoCard>
              <InfoTitle>
                <span className="line" />
                <h2>Informações</h2>
              </InfoTitle>

              <InfoList>
                <InfoItem alignStart>
                  <div className="icon-wrapper">
                    <MapPin />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '0.25rem' }}>Endereço</h3>
                    <p>
                      Rua Exemplo, 123 - Centro<br />
                      São Paulo, SP - CEP 01234-567
                    </p>
                  </div>
                </InfoItem>

                <InfoItem>
                  <div className="icon-wrapper">
                    <Phone />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '0.25rem' }}>Telefone</h3>
                    <a href="tel:+5511987654321" style={{ color: 'inherit' }}>
                      (11) 98765-4321
                    </a>
                  </div>
                </InfoItem>

                <InfoItem>
                  <div className="icon-wrapper">
                    <Mail />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '0.25rem' }}>Email</h3>
                    <a href="mailto:contato@barbearia.com" style={{ color: 'inherit' }}>
                      contato@barbearia.com
                    </a>
                  </div>
                </InfoItem>

                <InfoItem alignStart>
                  <div className="icon-wrapper">
                    <Clock />
                  </div>
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Horário de Funcionamento</h3>
                    <Schedule>
                      <p>
                        <span>Segunda a Sexta:</span>
                        <span className="time">9h - 20h</span>
                      </p>
                      <p>
                        <span>Sábado:</span>
                        <span className="time">9h - 18h</span>
                      </p>
                      <p>
                        <span>Domingo:</span>
                        <span className="closed">Fechado</span>
                      </p>
                    </Schedule>
                  </div>
                </InfoItem>
              </InfoList>

              <WhatsAppButton onClick={handleWhatsAppClick}>
                <MessageCircle style={{ marginRight: '0.5rem' }} />
                Falar no WhatsApp
              </WhatsAppButton>
            </InfoCard>
          </div>

          <MapCard>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977493861877!2d-46.65469492377026!3d-23.561414978787805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
              allowFullScreen
              loading="lazy"
              title="Localização da Barbearia Premium"
            />
          </MapCard>
        </Grid>
      </Content>
    </Container>
  );
}
