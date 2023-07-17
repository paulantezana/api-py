import { Dropdown, Space } from 'antd';
import {  MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  flexRender,
  Cell
} from '@tanstack/react-table'
import {  TableTd } from './TableStyled';


interface CustomTableBodyCellProps {
    cell: Cell<Record<string, any>, unknown>;
    actions?: MenuProps['items'];
    parentIndex?: Number;
}

const CustomTableBodyCell = ({ cell, actions, parentIndex = 0 } : CustomTableBodyCellProps)=> {
    return (<TableTd
        {...{
          key: cell.id,
          style: {
            width: cell.column.getSize(),
            display: parentIndex === 0 ? 'flex': 'block',
            justifyContent: parentIndex === 0 ? 'space-between' : 'initial',
          },
        }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
        {
          parentIndex === 0 &&
          <Dropdown menu={{ items: actions }} trigger={['click']} arrow>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreOutlined />
              </Space>
            </a>
          </Dropdown>
        }
      </TableTd>)
}

export default CustomTableBodyCell;

