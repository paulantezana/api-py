import { useEffect, useState } from 'react'
import './style.css';

import {
  ColumnResizeMode,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<Record<string, any>>()

export interface StandartTableProps {
  columns: Record<string, any>[];
  dataset: Record<string, any>[];
}

const useColumns = (columns: Record<string, any>[]) => {
  const columnsConfig = columns.map((item) => {
    return columnHelper.accessor(item.field_name, {
      header: item.field_title,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    })
  });

  return columnsConfig;
};

const StandartTable = ({ columns, dataset }: StandartTableProps) => {
  const [data, setData] = useState(dataset)
  const columnsConfig = useColumns(columns);
  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')
  // columns={columns} dataset={dataset}

  const table = useReactTable({
    data,
    columnResizeMode,
    columns: columnsConfig,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(()=> {
    setData(dataset);
  },[dataset])

  console.log(dataset, 'dataset____________');

  return (
    <div>
      <table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  {...{
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  {...{
                    key: cell.id,
                    style: {
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default StandartTable;