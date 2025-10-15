import { useState } from 'react';
import { Menu, X, Scissors, User, LogOut } from 'lucide-react';
import styled from 'styled-components';
import { Button } from './Button';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
`;

const NavContainer = styled.div`
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

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;

const Logo = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #d4af37, #f4e5b8, #c9a332);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;

  ${Logo}:hover & {
    transform: rotate(6deg);
  }

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

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.button`
  position: relative;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray300};
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: white;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}, transparent);
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: ${props => props.active ? 1 : 0.5};
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(212, 175, 55, 0.3);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #d4af37, #c9a332);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #000;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-size: 0.875rem;
    color: white;
  }

  .role {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.gray400};
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const MobileMenu = styled.div`
  padding: 1rem 0;
  border-top: 1px solid rgba(212, 175, 55, 0.2);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'rgba(212, 175, 55, 0.1)' : 'transparent'};
  border: none;
  border-left: 4px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray300};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: white;
    background: rgba(26, 26, 26, 1);
  }
`;

const MobileUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  margin-top: 0.5rem;
  background: rgba(212, 175, 55, 0.05);
`;

const LogoutButton = styled(Button)`
  padding: 0.5rem;
`;

export function Navbar({ currentPage, onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = user
    ? user.role === 'admin'
      ? [
          { name: 'Início', page: 'home' },
          { name: 'Serviços', page: 'servicos' },
          { name: 'Contato', page: 'contato' },
          { name: 'Admin', page: 'admin' },
        ]
      : [
          { name: 'Início', page: 'home' },
          { name: 'Serviços', page: 'servicos' },
          { name: 'Agendar', page: 'agendar' },
          { name: 'Meus Agendamentos', page: 'agendamentos' },
          { name: 'Contato', page: 'contato' },
        ]
    : [
        { name: 'Início', page: 'home' },
        { name: 'Serviços', page: 'servicos' },
        { name: 'Contato', page: 'contato' },
        { name: 'Login', page: 'login' },
      ];

  return (
    <Nav>
      <NavContainer>
        <NavContent>
          <Logo onClick={() => onNavigate('home')}>
            <LogoIcon>
              <Scissors />
            </LogoIcon>
            <LogoText>
              <span className="main">Barbearia</span>
              <span className="sub">Premium</span>
            </LogoText>
          </Logo>

          <DesktopNav>
            {navItems.map((item) => (
              <NavItem
                key={item.page}
                active={currentPage === item.page}
                onClick={() => onNavigate(item.page)}
              >
                {item.name}
              </NavItem>
            ))}
            {user && (
              <UserSection>
                <UserInfo>
                  <UserAvatar>
                    <User />
                  </UserAvatar>
                  <UserDetails>
                    <span className="name">{user.nome}</span>
                    <span className="role">Cliente Premium</span>
                  </UserDetails>
                </UserInfo>
                <LogoutButton
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                >
                  <LogOut />
                </LogoutButton>
              </UserSection>
            )}
          </DesktopNav>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </MobileMenuButton>
        </NavContent>

        {mobileMenuOpen && (
          <MobileMenu>
            {navItems.map((item) => (
              <MobileNavItem
                key={item.page}
                active={currentPage === item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </MobileNavItem>
            ))}
            {user && (
              <>
                <MobileUserSection>
                  <UserAvatar>
                    <User />
                  </UserAvatar>
                  <UserDetails>
                    <span className="name">{user.nome}</span>
                    <span className="role">Cliente Premium</span>
                  </UserDetails>
                </MobileUserSection>
                <MobileNavItem
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>Sair da Conta</span>
                  </div>
                </MobileNavItem>
              </>
            )}
          </MobileMenu>
        )}
      </NavContainer>
    </Nav>
  );
}
