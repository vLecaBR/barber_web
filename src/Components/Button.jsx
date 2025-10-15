import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => {
    if (props.size === 'lg') return '1.5rem 2rem';
    if (props.size === 'sm') return '0.5rem 1rem';
    return '0.75rem 1.5rem';
  }};
  font-size: ${props => props.size === 'lg' ? '1.125rem' : '1rem'};
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all ${props => props.theme.transitions.normal} cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  white-space: nowrap;

  ${props => {
    if (props.variant === 'outline') {
      return `
        background: transparent;
        border: 2px solid ${props.theme.colors.primary};
        color: ${props.theme.colors.primary};
        
        &:hover:not(:disabled) {
          background: ${props.theme.colors.primary};
          color: #000;
          transform: scale(1.05);
        }
      `;
    }
    
    if (props.variant === 'ghost') {
      return `
        background: transparent;
        color: ${props.theme.colors.gray400};
        
        &:hover:not(:disabled) {
          color: ${props.theme.colors.primary};
          background: rgba(212, 175, 55, 0.1);
        }
      `;
    }
    
    return `
      background: ${props.theme.gradients.gold};
      color: #000;
      box-shadow: ${props.theme.shadows.lg};
      
      &:hover:not(:disabled) {
        background: ${props.theme.gradients.goldReverse};
        box-shadow: ${props.theme.shadows.xl};
        transform: scale(1.05);
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
