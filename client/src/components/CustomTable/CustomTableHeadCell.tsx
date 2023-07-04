import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Dropdown, Popover, Row, Space, Switch, Tag } from 'antd';
import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterOutlined, TableOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
    ColumnResizeMode,
    Header,
    Table,
    createColumnHelper,
    flexRender,
} from '@tanstack/react-table'
import { TableRezise, TableTh } from './TableStyled';

const columnHelper = createColumnHelper<Record<string, any>>()

export interface SSRTableProps {
    actions?: MenuProps['items'];
    columns: Record<string, any>[];
    dataset: Record<string, any>[];
    setPagination: any,
    pagination: any,
    pageCount?: number,
    columnVisibility?: any,
    setColumnVisibility?: any,
    columnOrder?: any,
    setColumnOrder?: any,
    sorting?: any,
    setSorting?: any,
    onTableHeaderMenuClick?: MenuProps['onClick']
}

// const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

const useColumns = (columns: Record<string, any>[]) => {
    const columnsConfig = columns.map((item) => {
        return columnHelper.accessor(item.field_name, {
            header: item.field_title,
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
            // size: 50,
        })
    });

    return columnsConfig;
};

const getColumByFieldName = (colums: Record<string, any>[], fieldName: string): Record<string, any> | any => {
    return colums.find(item => item.field_name === fieldName)
}

const buidlTableHeaderMenuItems = (column: Record<string, any>): MenuProps['items'] => {
    let items: MenuProps['items'] = [];

    if (column.sortable) {
        items = [...items,
        {
            label: 'Ascendente',
            key: '0',
            icon: <SortAscendingOutlined />,
        },
        {
            label: 'Descendente',
            key: '1',
            icon: <SortDescendingOutlined />,
        },
        ]
    }

    if (column.filterable) {
        items = [...items,
        {
            label: 'Filtrar',
            key: '2',
            icon: <FilterOutlined />,
        },
        {
            label: 'Borrar filtro',
            key: '3',
            icon: <FilterOutlined />,
        },
        ]
    }

    items = [
        ...items,
        {
            label: '¿Que es esto?',
            key: '4',
            icon: <QuestionCircleOutlined />
        },
    ]

    return items;
}

interface CustomTableHeadCellContentProps {
    header: Header<Record<string, any>, unknown>;
    table: Table<Record<string, any>>;
    dropdownItems: MenuProps['items'];
    columnResizeMode: ColumnResizeMode;
    onTableHeaderMenuClick: (column: any, event: string) => void; // Reemplaza "any" con el tipo adecuado para "column"
}

const CustomTableHeadCellContent = ({ header, table, dropdownItems, columnResizeMode, onTableHeaderMenuClick }: CustomTableHeadCellContentProps) => {
    const handleTableHeaderMenuClick: MenuProps['onClick'] = (event) => {
        // const eventKey = event.key;
        onTableHeaderMenuClick(header.column, event.key);
        // if(eventKey)
        // header.column.toggleSorting()
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
            <Dropdown menu={{ items: dropdownItems, onClick: handleTableHeaderMenuClick }} trigger={['click']} >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
   
            <TableRezise
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
        </>
    )
}

interface CustomTableHeadCellProps extends CustomTableHeadCellContentProps {
    // header: Header<Record<string, any>>;
    // table:Table<Record<string, any>>;
    // dropdownItems: MenuProps['items'];
    // columnResizeMode:ColumnResizeMode;
    // onTableHeaderMenuClick
}

const CustomTableHeadCell = ({ header, table, dropdownItems, columnResizeMode, onTableHeaderMenuClick }: CustomTableHeadCellProps) => {
    return (<TableTh
        {...{
            key: header.id,
            colSpan: header.colSpan,
            style: {
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
            />
        }
    </TableTh>)
}

export default CustomTableHeadCell;