import styled from 'styled-components';

export const Card = styled.div`
  background: ${props => props.transparent ? 'transparent' : 'rgba(26, 26, 26, 0.8)'};
  backdrop-filter: ${props => props.transparent ? 'none' : 'blur(20px)'};
  border: ${props => props.noBorder ? 'none' : '1px solid #2a2a2a'};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: ${props => props.overflow || 'visible'};
  transition: all ${props => props.theme.transitions.normal};

  ${props => props.hoverable && `
    &:hover {
      border-color: ${props.theme.colors.primary};
      transform: translateY(-0.25rem);
    }
  `}
`;

export const CardContent = styled.div`
  padding: ${props => props.padding || '1.5rem'};
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: ${props => props.noBorder ? 'none' : '1px solid #2a2a2a'};
`;

export const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  color: ${props => props.theme.colors.gray400};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
