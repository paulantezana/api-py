import { useEffect, useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { ColumnOrderState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { screenEntityPaginate, screenEntityPaginateProperties } from "services/screenEntity";
import { getActions } from "services/config";
import ToolbarAction from "components/ToolbarAction/ToolbarAction";
import { MenuProps } from "antd";
import CustomTable from "components/CustomTable/CustomTable";

interface MaintenanceTableProps {
  screenId:number,
}

const MaintenanceTable = ({screenId}:MaintenanceTableProps) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const paginateHeaderQuery = useQuery({
    queryKey: ['paginate_properties'],
    queryFn: () => screenEntityPaginateProperties(screenId)
  });

  const paginationQuery = useQuery({
    queryKey: ['pagination', { pageIndex, pageSize, screenId, sorting }],
    queryFn: () => screenEntityPaginate({ pageIndex, pageSize, screenId, sorting }),
  });

  const actionsQuery = useQuery({
    queryKey: ['toolbar_actions', screenId],
    queryFn: () => getActions(screenId)
  });

  useEffect(() => {
    const headerData = paginateHeaderQuery.data?.header ?? [];
    if (headerData.length > 0) {
      const orderedColumns = headerData.sort((a: Record<string, any>, b: Record<string, any>) => a.col_index - b.col_index).map((item: Record<string, any>) => item.field_name as string);
      const colVisibility = headerData.reduce((a: Record<string, any>, b: Record<string, any>) => {
        a[b.field_name] = b.visible
        return a;
      }, {});

      setColumnOrder(orderedColumns);
      setColumnVisibility(colVisibility);
    }
  }, [paginateHeaderQuery.data?.header ?? []]);

  const handleTableHeaderMenuClick:MenuProps['onClick'] = (e)=> {
    switch (e.key) {
      case '0':
        break;
      case '1':
        break;
      case '1':
        break;
      case '1':
        break;
      default:
        break;
    }
  }

  const handleToolbarActionClick = (key:string, domEvent:MouseEvent) => {
    // const matchItem = customItems[key];
  };

  const toolbarActions = (actionsQuery.data ?? []).filter((item : any) => item.position === 'TOOLBAR');
  const tableActions = (actionsQuery.data ?? []).filter((item : any) => item.position === 'TABLE').map((item:any)=>({label: item.title, key: item.id}))

  console.log({ /*pageIndex, pageSize,*/ columnVisibility, columnOrder, sorting }, '__COMO__');

  return (
    <div>
      <ToolbarAction items={toolbarActions} onClick={handleToolbarActionClick} />
      <CustomTable
        actions={tableActions}
        columns={paginateHeaderQuery.data?.header ?? []}
        dataset={paginationQuery.data?.rows ?? []}
        pageCount={paginationQuery.data?.page_count ?? -1}
        pagination={pagination}
        setPagination={setPagination}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        onTableHeaderMenuClick={handleTableHeaderMenuClick}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  )
};

export default MaintenanceTable;