import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Dropdown, Popover, Row, Space, Switch, Tag } from 'antd';
import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterOutlined, TableOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  ColumnResizeMode,
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  Table
} from '@tanstack/react-table'
import { Table as TableStyled, TableBody, TableFoot, TableHead, TableRezise, TableRow, TableTd, TableTh, TableWrapper } from './TableStyled';

import ColumnVisibility from './ColumnVisibility';
import CustomTableHeadCell from './CustomTableHeadCell';

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

const SSRTable = ({
  actions = [],
  columns,
  dataset,
  pagination,
  setPagination,
  pageCount = 10,
  columnVisibility,
  setColumnVisibility,
  columnOrder,
  setColumnOrder,
  sorting,
  setSorting,
  onTableHeaderMenuClick = () => console.log('onTableHeaderMenuClick')
}: SSRTableProps) => {
  const [data, setData] = useState(dataset)
  const columnsConfig = useColumns(columns);
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onEnd') // onChange - onEnd

  const table = useReactTable({
    data,
    pageCount,
    columnResizeMode,
    columns: columnsConfig,
    state: {
      pagination,
      columnVisibility,
      columnOrder,
      sorting,
    },
    enableMultiSort: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    setData(dataset);
  }, [dataset])

  return (
    <div>
      <Row>
        <Col flex={'auto'}>
          <Tag closable>Filter 1</Tag><Tag closable>Filter 2</Tag>
        </Col>
        <Col>
          <Space.Compact block >
            <Button icon={<FilterOutlined />}></Button>
            <Popover placement="right" trigger={'click'} content={<ColumnVisibility table={table} />}>
              <Button icon={<TableOutlined />}></Button>
            </Popover>
          </Space.Compact>
        </Col>
      </Row>
      <TableWrapper>
        <TableStyled
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const column = getColumByFieldName(columns, header.id)
                  const dropdownItems = buidlTableHeaderMenuItems(column)

                  return (<CustomTableHeadCell
                    header={header}
                    table={table}
                    dropdownItems={dropdownItems}
                    columnResizeMode={columnResizeMode}
                    onTableHeaderMenuClick={onTableHeaderMenuClick} />)
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableTd
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {
                      index === 0 &&
                      <Dropdown menu={{ items: actions }} >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <MoreOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    }
                  </TableTd>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot></TableFoot>
        </TableStyled>
      </TableWrapper>
    </div>
  );
};

export default SSRTable;