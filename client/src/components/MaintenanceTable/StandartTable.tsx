import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './style.css';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined, FilterOutlined, QuestionCircleOutlined, MoreOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  ColumnResizeMode,
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table'
import { Table, TableBody, TableFoot, TableHead, TableRezise, TableRow, TableTh, TableWrapper } from './TableStyled';

const columnHelper = createColumnHelper<Record<string, any>>()

export interface StandartTableProps {
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
      // sor
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

const StandartTable = ({
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
}: StandartTableProps) => {
  const [data, setData] = useState(dataset)
  const columnsConfig = useColumns(columns);
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onEnd')

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
      {/* <div>
        <div>
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div> */}
      <TableWrapper>
        <Table
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

                  return (
                    <TableTh
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {
                        header.isPlaceholder ? null : (
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
                            <Dropdown menu={{ items: dropdownItems, onClick: onTableHeaderMenuClick }} trigger={['click']} >
                              <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                  <DownOutlined />
                                </Space>
                              </a>
                            </Dropdown>
                            {/* <div>{ JSON.stringify(header) }</div> */}
                            <TableRezise
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `${header.column.getIsResizing() ? 'isResizing' : ''
                                  }`,
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
                    </TableTh>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
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
                  </td>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFoot></TableFoot>
        </Table>
      </TableWrapper>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {/* {dataQuery.isFetching ? 'Loading...' : null} */}
      </div>
    </div>
  );
};

export default StandartTable;