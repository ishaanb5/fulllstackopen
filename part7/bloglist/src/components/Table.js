import styled from 'styled-components'

const Table = styled.table`
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-collapse: collapse;

  & > thead th {
    background: var(--clr-primary-900);
    color: white;
    padding: 15px;
    font-size: 20px;
  }

  & > tbody td {
    padding: 12px 15px;
  }

  & > tbody tr {
    border-bottom: thin solid var(--clr-primary-400);
  }

  & > tbody td:nth-child(1) > a {
    color: white;
  }

  & > tbody td:nth-child(1) > a:hover {
    text-decoration: none;
  }

  & > tbody td:nth-child(2) {
    text-align: center;
    color: white;
  }
`

export default Table
