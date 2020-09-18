import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';

const Degree: FC<Props> & {
  Styled: StyledComponent<'p', any, {}, never>;
} = ({ children, ...rest }: Props) => (
  <Degree.Styled {...rest}>
    {children}
    <span>°</span>
    <span>c</span>
  </Degree.Styled>
);

Degree.Styled = styled.p`
  font-size: ${({ size }: Props) => size};
  span {
    font-weight: normal !important;

    &:last-child {
      position: relative;
      bottom: ${({ bottom }: Props) => bottom};
      font-size: ${({ cSize }: Props) => cSize};
    }
  }
`;

Degree.defaultProps = {
  size: '1rem',
  bottom: '0.29rem',
  cSize: '0.8rem',
};

type Props = {
  children: string | number;
  size?: string;
  bottom?: string;
  cSize?: string;
};

export default Degree;
