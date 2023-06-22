import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;
    border-radius: 4px;
    border-collapse: separate;
    border-spacing: 0;
`;

export const TableHead = styled.thead`
  
`;

export const TableBody = styled.tbody`
  
`;

export const TableFoot = styled.tfoot`
  
`;

export const TableRow = styled.tr`
  
`;

export const TableTh = styled.th`
  position: relative;
  padding: 6px 4px 4px;
  border-bottom: 1px solid #ddd;
  /* display: flex;
  justify-content: space-between; */
  .ant-dropdown-trigger{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    opacity: 0;
    margin-right: 4px;
  }
  &:hover{
    background: #E5F3FE;
    .ant-dropdown-trigger{
      opacity: 1;
    }
  }
`;

export const TableTd = styled.td`
  border-bottom: 1px solid #ddd;
`;

export const TableRezise = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 2px;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  &.isResizing {
    background: #66BAFF;
    opacity: 1;
  }
`;