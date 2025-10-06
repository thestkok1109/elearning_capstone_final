import styled from "styled-components";

export const ButtonStyled = styled.button `
    background-color: #1d7a85;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;

    &:hover {
        transition: all .2s ease;
        box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1d7a85;
    }
`;