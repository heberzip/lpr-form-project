// EXTERNAL MODULES
import styled from "styled-components";

const UnderlineEffect = ({ children }: { children: React.ReactNode }) => {
  return <Underline>{children}</Underline>;
};

export default UnderlineEffect;

// STYLES
const Underline = styled.p`
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
  margin-bottom: 1rem;

  font-size: 1.5rem;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 10px;
    background-color: #309eb5;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
