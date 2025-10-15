import styled from 'styled-components';
import { Button } from '../../Components/Button';
import { Calendar, Clock, Shield, Award, Sparkles, Star } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #000 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.7) 100%);
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 1rem;
  z-index: 10;

  @media (min-width: 640px) {
    padding: 5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 5rem 2rem;
  }
`;

const HeroInner = styled.div`
  max-width: 48rem;
  animation: fadeInUp 0.8s ease-out;
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  margin-bottom: 1.5rem;

  svg {
    width: 1rem;
    height: 1rem;
    color: ${props => props.theme.colors.primary};
  }

  span {
    color: ${props => props.theme.colors.primary};
    font-size: 0.875rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 6rem;
  }

  .line1 {
    display: block;
    color: ${props => props.theme.colors.white};
  }

  .line2 {
    display: block;
    background: ${props => props.theme.gradients.gold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(212, 175, 55, 0.2),
        transparent
      );
      animation: shimmer 3s infinite;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray300};
  margin-bottom: 3rem;
  line-height: 1.75;
  max-width: 42rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(to bottom, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 5rem;
    background: linear-gradient(to bottom, transparent, #d4af37, transparent);
  }
`;

const SectionContent = styled.div`
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  .label-container {
    display: inline-block;
    margin-bottom: 1rem;
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

  h2 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.white};
    margin-bottom: 1.5rem;

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
    max-width: 42rem;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeatureCard = styled.div`
  position: relative;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid #2a2a2a;
  border-radius: 1rem;
  padding: 2rem;
  transition: all ${props => props.theme.transitions.slow};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-0.5rem);
    box-shadow: ${props => props.theme.shadows.luxury};
  }

  .icon-wrapper {
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #d4af37, #c9a332);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform ${props => props.theme.transitions.normal};

    svg {
      width: 2rem;
      height: 2rem;
      color: #000;
    }
  }

  &:hover .icon-wrapper {
    transform: rotate(6deg);
  }

  h3 {
    color: ${props => props.theme.colors.white};
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    transition: color ${props => props.theme.transitions.normal};
  }

  &:hover h3 {
    color: ${props => props.theme.colors.primary};
  }

  p {
    color: ${props => props.theme.colors.gray400};
    line-height: 1.75;
  }

  .corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 5rem;
    height: 5rem;
    border-top: 2px solid transparent;
    border-right: 2px solid transparent;
    border-radius: 0 1rem 0 0;
    transition: border-color ${props => props.theme.transitions.slow};
  }

  &:hover .corner {
    border-color: rgba(212, 175, 55, 0.3);
  }
`;

export function Home({ onNavigate }) {
  const features = [
    {
      icon: Award,
      title: 'Excelência Premium',
      description: 'Profissionais especializados em técnicas clássicas e modernas.',
    },
    {
      icon: Sparkles,
      title: 'Experiência Única',
      description: 'Ambiente sofisticado com atendimento personalizado.',
    },
    {
      icon: Clock,
      title: 'Pontualidade',
      description: 'Valorizamos seu tempo com precisão em cada agendamento.',
    },
    {
      icon: Shield,
      title: 'Higiene Impecável',
      description: 'Protocolos rigorosos de esterilização e segurança.',
    },
  ];

  return (
    <Container>
      <HeroSection>
        <HeroBackground>
          <img
            src="https://images.unsplash.com/photo-1667539916609-c706d5b7ed65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwMzc1NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Interior da barbearia"
          />
          <HeroOverlay />
        </HeroBackground>

        <HeroContent>
          <HeroInner>
            <Label>
              <Star />
              <span>Barbearia Premium</span>
            </Label>
            
            <Title>
              <span className="line1">A Arte de</span>
              <span className="line2">Ser Cavalheiro</span>
            </Title>
            
            <Subtitle>
              Onde tradição encontra sofisticação. Experimente o mais alto padrão em grooming masculino.
            </Subtitle>
            
            <ButtonGroup>
              <Button size="lg" onClick={() => onNavigate('agendar')}>
                Reservar Horário
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('servicos')}>
                Nossos Serviços
              </Button>
            </ButtonGroup>
          </HeroInner>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionContent>
          <SectionHeader>
            <div className="label-container">
              <div className="line" />
              <p className="small-title">Distinção</p>
            </div>
            <h2>
              Experiência <span className="gradient">Incomparável</span>
            </h2>
            <p>
              Cada detalhe pensado para proporcionar momentos únicos de cuidado pessoal
            </p>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <FeatureCard key={index}>
                  <div className="icon-wrapper">
                    <Icon />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="corner" />
                </FeatureCard>
              );
            })}
          </FeaturesGrid>
        </SectionContent>
      </FeaturesSection>
    </Container>
  );
}
