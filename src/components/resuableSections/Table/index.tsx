import React, { FC } from 'react';
import styled, { StyledComponent } from 'styled-components';

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
            <span>{key.replace('_', ' ').toLocaleUpperCase()}</span>
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
  &,
  thead,
  tbody {
    width: 100%;
  }
  thead {
    background-color: #f8fafd;
    th {
      margin: 0;
      color: #6c757e;
      white-space: nowrap;
      border-top: 1px solid #e7eaf3;
      border-bottom: 3px solid #e7eaf3;
      padding: 0.625rem;
      text-align: left;
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: rgba(231, 234, 243, 0.4);
      }
      &:not(:last-child) td {
        border-bottom: 1px solid #e7eaf3;
      }

      td {
        white-space: nowrap;
        padding: 0.625rem;
        vertical-align: top;
        max-width: 5em;
      }
    }
  }
`;

export default Table;
