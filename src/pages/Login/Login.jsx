import { useState } from 'react';
import styled from 'styled-components';
import { Loader2, Scissors } from 'lucide-react';
import { Button } from '../components/Button';
import { login, cadastro } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #0f0f0f);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  position: relative;
  overflow: hidden;
`;

const DecorativeBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24rem;
    height: 24rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    filter: blur(100px);
  }

  &::before {
    top: 5rem;
    left: 5rem;
  }

  &::after {
    bottom: 5rem;
    right: 5rem;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 10;
  animation: fadeInUp 0.8s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const LogoIcon = styled.div`
  display: inline-flex;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a332);
  border-radius: 1.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: #000;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: white;
  margin-bottom: 0.75rem;

  .gradient {
    background: ${props => props.theme.gradients.gold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray400};
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const AdminNote = styled.div`
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 0.75rem;
  padding: 1rem;
  max-width: 28rem;
  margin: 0 auto;

  p {
    color: ${props => props.theme.colors.gray400};
    font-size: 0.875rem;
    text-align: center;

    .highlight {
      color: ${props => props.theme.colors.primary};
    }

    .email {
      color: white;
    }
  }
`;

const Card = styled.div`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 1rem;
  box-shadow: ${props => props.theme.shadows.luxury};
`;

const TabsContainer = styled.div`
  width: 100%;
`;

const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 0.75rem;
  padding: 0.375rem;
  gap: 0.25rem;
  height: auto;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: ${props => props.active ? 'linear-gradient(to right, #d4af37, #c9a332)' : 'transparent'};
  color: ${props => props.active ? '#000' : props.theme.colors.gray300};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: ${props => props.active ? '#000' : 'white'};
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  display: ${props => props.active ? 'block' : 'none'};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray500};
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 0.75rem;
  padding: 1rem;

  p {
    color: #fca5a5;
    font-size: 0.875rem;
  }
`;

const LoadingIcon = styled(Loader2)`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export function LoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const [cadastroNome, setCadastroNome] = useState('');
  const [cadastroEmail, setCadastroEmail] = useState('');
  const [cadastroTelefone, setCadastroTelefone] = useState('');
  const [cadastroSenha, setCadastroSenha] = useState('');
  const [cadastroConfirmSenha, setCadastroConfirmSenha] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(loginEmail, loginSenha);
      localStorage.setItem('token', response.token);
      onLogin(response.user, response.token);
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();
    setError('');

    if (cadastroSenha !== cadastroConfirmSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (cadastroSenha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await cadastro({
        nome: cadastroNome,
        email: cadastroEmail,
        telefone: cadastroTelefone,
        senha: cadastroSenha,
      });
      localStorage.setItem('token', response.token);
      onLogin(response.user, response.token);
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <DecorativeBackground />

      <Content>
        <Header>
          <LogoIcon>
            <Scissors />
          </LogoIcon>
          <Title>
            Bem-vindo à <span className="gradient">Elite</span>
          </Title>
          <Subtitle>Entre ou crie sua conta premium</Subtitle>

          <AdminNote>
            <p>
              <span className="highlight">Dica:</span> Use <span className="email">admin@barbearia.com</span> para acessar o painel administrativo
            </p>
          </AdminNote>
        </Header>

        <Card>
          <TabsContainer>
            <TabsList>
              <TabButton
                active={activeTab === 'login'}
                onClick={() => setActiveTab('login')}
                type="button"
              >
                Entrar
              </TabButton>
              <TabButton
                active={activeTab === 'cadastro'}
                onClick={() => setActiveTab('cadastro')}
                type="button"
              >
                Cadastrar
              </TabButton>
            </TabsList>

            <TabContent active={activeTab === 'login'}>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    required
                  />
                </FormGroup>

                {error && (
                  <ErrorBox>
                    <p>{error}</p>
                  </ErrorBox>
                )}

                <Button type="submit" disabled={loading} style={{ width: '100%', height: '3rem' }}>
                  {loading ? (
                    <>
                      <LoadingIcon />
                      Entrando...
                    </>
                  ) : (
                    'Entrar na Conta'
                  )}
                </Button>
              </Form>
            </TabContent>

            <TabContent active={activeTab === 'cadastro'}>
              <Form onSubmit={handleCadastro}>
                <FormGroup>
                  <Label>Nome Completo</Label>
                  <Input
                    type="text"
                    placeholder="João Silva"
                    value={cadastroNome}
                    onChange={(e) => setCadastroNome(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={cadastroEmail}
                    onChange={(e) => setCadastroEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Telefone</Label>
                  <Input
                    type="tel"
                    placeholder="(11) 98765-4321"
                    value={cadastroTelefone}
                    onChange={(e) => setCadastroTelefone(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={cadastroSenha}
                    onChange={(e) => setCadastroSenha(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Confirmar Senha</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={cadastroConfirmSenha}
                    onChange={(e) => setCadastroConfirmSenha(e.target.value)}
                    required
                  />
                </FormGroup>

                {error && (
                  <ErrorBox>
                    <p>{error}</p>
                  </ErrorBox>
                )}

                <Button type="submit" disabled={loading} style={{ width: '100%', height: '3rem' }}>
                  {loading ? (
                    <>
                      <LoadingIcon />
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta Premium'
                  )}
                </Button>
              </Form>
            </TabContent>
          </TabsContainer>
        </Card>
      </Content>
    </Container>
  );
}
