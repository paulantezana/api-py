import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-y: auto;
`;

export const Table = styled.div`
  /* width: 100%;
    border-radius: 4px;
    border-collapse: separate;
    border-spacing: 0; */
`;

export const TableHead = styled.div`
  
`;

export const TableBody = styled.div`
  
`;

export const TableFoot = styled.div`
  
`;

export const TableRow = styled.div`
  display: flex;
`;

export const TableTh = styled.div`
  position: relative;
  padding: 6px 4px 4px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;

  .ant-dropdown-trigger{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    opacity: 0;
    margin-right: 4px;
  }
  &:hover{
    /* background: #E5F3FE; */
    .ant-dropdown-trigger{
      opacity: 1;
    }
  }
`;

export const TableTd = styled.div`
  /* border-bottom: 1px solid #ddd; */
`;

export const TableRezise = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.5);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  &.isResizing{
    background: blue;
    opacity: 1;
  }

  @media (hover: hover) {
    opacity: 0;

    *:hover > & {
      opacity: 1;
    }
  }
`;