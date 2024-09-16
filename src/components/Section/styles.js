import styled from "styled-components";

export const Container = styled.section`
  margin: 28px 0;

  > h2 {
    border-bottom: solid 1px ${({ theme }) => theme.COLORS.BACKGROUND};

    padding-bottom: 16px;
    margin-bottom: 24px;

    color: ${({ theme }) => theme.COLORS.GRAY_FONT};
    font-size: 20px;
    font-weight: 400;
  }
`;