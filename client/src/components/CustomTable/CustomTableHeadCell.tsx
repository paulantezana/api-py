import { Dropdown, Space } from 'antd';
import { DownOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
    ColumnResizeMode,
    Header,
    Table,
    flexRender,
} from '@tanstack/react-table'
import { TableRezise, TableTh } from './TableStyled';

interface CustomTableHeadCellContentProps {
    header: Header<Record<string, any>, unknown>;
    table: Table<Record<string, any>>;
    dropdownItems: MenuProps['items'];
    columnResizeMode: ColumnResizeMode;
    onTableHeaderMenuClick: (column: any, event: string) => void; // Reemplaza "any" con el tipo adecuado para "column"
    isLast: Boolean;
}

const CustomTableHeadCellContent = ({ header, table, dropdownItems, columnResizeMode, onTableHeaderMenuClick, isLast }: CustomTableHeadCellContentProps) => {
    const handleTableHeaderMenuClick: MenuProps['onClick'] = (event) => {
        onTableHeaderMenuClick(header.column, event.key);
    }

    return (
        <>
            <div
                {...{
                    className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                    onClick: header.column.getToggleSortingHandler(),
                }}
            >
                {
                    flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )
                }
                {{
                    asc: <ArrowUpOutlined />,
                    desc: <ArrowDownOutlined />,
                }[header.column.getIsSorted() as string] ?? null}
            </div>
            {
                !isLast && <TableRezise
                    {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                        style: {
                            transform:
                                columnResizeMode === 'onEnd' &&
                                    header.column.getIsResizing()
                                    ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                                    }px)`
                                    : '',
                        },
                    }}
                />
            }
            <Dropdown menu={{ items: dropdownItems, onClick: handleTableHeaderMenuClick }} trigger={['click']} arrow placement={"bottomRight"}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </>
    )
}

interface CustomTableHeadCellProps {
    header: Header<Record<string, any>, unknown>;
    table: Table<Record<string, any>>;
    dropdownItems: MenuProps['items'];
    columnResizeMode: ColumnResizeMode;
    onTableHeaderMenuClick: (column: any, event: string) => void; // Reemplaza "any" con el tipo adecuado para "column"
    isLast?: Boolean;
}

const CustomTableHeadCell = ({ header, table, dropdownItems, columnResizeMode, onTableHeaderMenuClick, isLast = false }: CustomTableHeadCellProps) => {
    return (<TableTh
        {...{
            key: header.id,
            colSpan: header.colSpan,
            style: {
                position: 'relative',
                width: header.getSize(),
            },
        }}
    >
        {
            header.isPlaceholder ? null : <CustomTableHeadCellContent
                header={header}
                table={table}
                dropdownItems={dropdownItems}
                columnResizeMode={columnResizeMode}
                onTableHeaderMenuClick={onTableHeaderMenuClick}
                isLast={isLast}
            />
        }
    </TableTh>)
}

export default CustomTableHeadCell;