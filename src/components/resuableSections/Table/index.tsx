import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';
import styles from './styled.css';

type Props = { data: Record<string, any> };

const Table: FC<Props> & {
  Styled: StyledComponent<'table', any, {}, never>;
} = ({ data }: Props) => (
  <Table.Styled>
    <thead>
      <tr>
        <th>Descriprion</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(data).map(([key, value]) => (
        <tr key={key}>
          <td>
            <span>
              {`${key.charAt(0).toUpperCase()}${key
                .substr(1, key.length)
                .replace('_', ' ')}`}
            </span>
          </td>
          <td>
            <span>{value}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </Table.Styled>
);

Table.Styled = styled.table`
  ${styles}
`;

export default Table;
