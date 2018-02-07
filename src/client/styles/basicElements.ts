import styled from 'styled-components'
import { colors, fontSize } from './variables';

export const TextButton = styled.button`
    font-size: ${fontSize.medium};
    border: none;
    cursor: pointer;
    color: ${colors.button.default};
    background: none;
    padding: 0;
    transition: color 0.2s linear;

    &:hover {
        color: ${colors.button.hover};
    }
`;
