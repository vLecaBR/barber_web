import styled from 'styled-components';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  border: 1px solid;
  text-transform: capitalize;
  white-space: nowrap;

  ${props => {
    if (props.variant === 'success') {
      return `
        background: rgba(16, 185, 129, 0.2);
        color: rgb(52, 211, 153);
        border-color: rgba(16, 185, 129, 0.3);
      `;
    }
    if (props.variant === 'warning') {
      return `
        background: rgba(245, 158, 11, 0.2);
        color: rgb(251, 191, 36);
        border-color: rgba(245, 158, 11, 0.3);
      `;
    }
    if (props.variant === 'error') {
      return `
        background: rgba(239, 68, 68, 0.2);
        color: rgb(252, 165, 165);
        border-color: rgba(239, 68, 68, 0.3);
      `;
    }
    if (props.variant === 'info') {
      return `
        background: rgba(59, 130, 246, 0.2);
        color: rgb(147, 197, 253);
        border-color: rgba(59, 130, 246, 0.3);
      `;
    }
    return `
      background: rgba(212, 175, 55, 0.2);
      color: ${props.theme.colors.primary};
      border-color: rgba(212, 175, 55, 0.3);
    `;
  }}
`;
