import { Button, Dropdown, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  flexRender,
  Cell
} from '@tanstack/react-table'
import { TableTd } from './TableStyled';


interface CustomTableBodyCellProps {
  cell: Cell<Record<string, any>, unknown>;
  actions?: MenuProps['items'];
  parentIndex?: Number;
}

const CustomTableBodyCell = ({ cell, actions, parentIndex = 0 }: CustomTableBodyCellProps) => {
  return (<TableTd
    {...{
      key: cell.id,
      style: {
        width: cell.column.getSize(),
      },
    }}
  >
    {
      parentIndex === 0 ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
        <Dropdown menu={{ items: actions }} trigger={['click']} arrow>
          <Button icon={<MoreOutlined />} size={"small"} ></Button>
        </Dropdown>
      </div>
        : flexRender(cell.column.columnDef.cell, cell.getContext())
    }
  </TableTd>)
}

export default CustomTableBodyCell;

