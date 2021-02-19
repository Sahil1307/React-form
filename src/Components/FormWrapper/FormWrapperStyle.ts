import styled from 'styled-components';

const FormWrapperStyle = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  background-size: cover;
  height: 100vh;
  @media(max-height: 660px) {
    height: 100%;
  /* margin-top:20px; */
  /* margin-bottom: 20px; */
  }

  padding: 0 20px;
`;

export default FormWrapperStyle;