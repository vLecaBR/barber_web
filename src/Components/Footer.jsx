import styled from 'styled-components';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Scissors } from 'lucide-react';

const FooterContainer = styled.footer`
  position: relative;
  background: linear-gradient(to bottom, #0a0a0a, #000);
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  margin-top: auto;
  overflow: hidden;
`;

const DecorativeBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 24rem;
    height: 24rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    filter: blur(100px);
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (min-width: 640px) {
    padding: 4rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    color: #000;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .main {
    font-size: 1.125rem;
    color: white;
    letter-spacing: 0.02em;
  }

  .sub {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.primary};
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
`;

const Tagline = styled.p`
  color: ${props => props.theme.colors.gray400};
  text-align: center;
  max-width: 28rem;
  font-style: italic;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoSection = styled.div`
  h3 {
    color: white;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .line {
      height: 1px;
      width: 2rem;
      background: ${props => props.theme.colors.primary};
    }
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: ${props => props.alignStart ? 'flex-start' : 'center'};
  gap: 0.75rem;
  color: ${props => props.theme.colors.gray400};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
    margin-top: ${props => props.alignStart ? '0.125rem' : '0'};
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;

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

const SocialSection = styled.div`
  p {
    color: ${props => props.theme.colors.gray400};
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  width: 3rem;
  height: 3rem;
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray400};
  transition: all 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const BottomSection = styled.div`
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 2rem;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.gray500};
  font-size: 0.875rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;

  button, a {
    background: none;
    border: none;
    color: ${props => props.theme.colors.gray500};
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export function Footer({ onNavigate }) {
  return (
    <FooterContainer>
      <DecorativeBackground />

      <FooterContent>
        <LogoSection>
          <LogoGroup>
            <LogoIcon>
              <Scissors />
            </LogoIcon>
            <LogoText>
              <span className="main">Barbearia</span>
              <span className="sub">Premium</span>
            </LogoText>
          </LogoGroup>
          <Tagline>"Onde tradição e sofisticação se encontram"</Tagline>
        </LogoSection>

        <InfoGrid>
          <InfoSection>
            <h3>
              <span className="line" />
              Contato
            </h3>
            <InfoList>
              <InfoItem alignStart>
                <MapPin />
                <span>
                  Rua Exemplo, 123 - Centro<br />
                  São Paulo, SP - CEP 01234-567
                </span>
              </InfoItem>
              <InfoItem>
                <Phone />
                <Link href="tel:+5511987654321">(11) 98765-4321</Link>
              </InfoItem>
              <InfoItem>
                <Mail />
                <Link href="mailto:contato@barbearia.com">contato@barbearia.com</Link>
              </InfoItem>
            </InfoList>
          </InfoSection>

          <InfoSection>
            <h3>
              <span className="line" />
              Horário
            </h3>
            <InfoList>
              <InfoItem alignStart>
                <Clock />
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
              </InfoItem>
            </InfoList>
          </InfoSection>

          <InfoSection>
            <h3>
              <span className="line" />
              Redes Sociais
            </h3>
            <SocialSection>
              <p>Siga-nos para novidades e promoções exclusivas</p>
              <SocialLinks>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </SocialLink>
                <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook />
                </SocialLink>
              </SocialLinks>
            </SocialSection>
          </InfoSection>
        </InfoGrid>

        <BottomSection>
          <BottomContent>
            <Copyright>
              &copy; {new Date().getFullYear()} Barbearia Premium. Todos os direitos reservados.
            </Copyright>
            <BottomLinks>
              {onNavigate && (
                <button onClick={() => onNavigate('contato')}>
                  Contato
                </button>
              )}
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
            </BottomLinks>
          </BottomContent>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
}
