import styled from 'styled-components';
import { X } from 'lucide-react';
import { Button } from './Button';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: ${props => props.open ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  position: relative;
  background: #1a1a1a;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 1rem;
  width: 100%;
  max-width: ${props => props.maxWidth || '32rem'};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.luxury};
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: scale(0.95) translateY(20px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #2a2a2a;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.gray400};
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.gray400};
  font-size: 0.875rem;
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #2a2a2a;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

export function Modal({ open, onClose, title, description, children, footer, maxWidth }) {
  if (!open) return null;

  return (
    <Overlay open={open} onClick={onClose}>
      <Content maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>
        
        {(title || description) && (
          <Header>
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </Header>
        )}
        
        <Body>{children}</Body>
        
        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Overlay>
  );
}
