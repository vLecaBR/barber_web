import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: ${props => props.height || '3rem'};
  padding: 0 1rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  font-size: 1rem;
  transition: all ${props => props.theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray500};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  font-size: 1rem;
  transition: all ${props => props.theme.transitions.normal};
  resize: ${props => props.resize || 'vertical'};
  min-height: ${props => props.minHeight || '100px'};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray500};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
`;

export const Select = styled.select`
  width: 100%;
  height: ${props => props.height || '3.5rem'};
  padding: 0 1rem;
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  option {
    background: #0a0a0a;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
