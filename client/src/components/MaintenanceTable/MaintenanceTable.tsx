import { useEffect, useMemo, useState } from "react";
import StandartTable from "./StandartTable";
import { useQuery } from '@tanstack/react-query'
import { ColumnOrderState, PaginationState } from "@tanstack/react-table";
import { screenEntityPaginate, screenEntityPaginateProperties } from "services/screenEntity";
import { getActions } from "services/config";
import ToolbarAction from "components/ToolbarAction/ToolbarAction";

interface MaintenanceTableProps {
  screenId:number,
}

const MaintenanceTable = ({screenId}:MaintenanceTableProps) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  const paginateHeaderQuery = useQuery({
    queryKey: ['paginateHeader'],
    queryFn: () => screenEntityPaginateProperties(screenId)
  });

  const paginationQuery = useQuery({
    queryKey: ['pagination', { pageIndex, pageSize }],
    queryFn: () => screenEntityPaginate({ pageIndex, pageSize, screenId }),
  });

  const actionsQuery = useQuery({
      queryKey: ['toolbar_actions', screenId],
      queryFn: () => getActions(screenId)
  });

  useEffect(() => {
    const headerData = paginateHeaderQuery.data?.header ?? [];
    if (headerData.length > 0) {
      const orderedColumns = headerData.sort((a: Record<string, any>, b: Record<string, any>) => a.col_index - b.col_index).map((item: Record<string, any>) => item.field_name as string);
      setColumnOrder(orderedColumns);
    }
  }, [paginateHeaderQuery.data?.header ?? []]);

  const handleTableHeaderMenuClick = ()=> {

  }

  const handleToolbarActionClick = (key:string, domEvent:MouseEvent) => {
    // const matchItem = customItems[key];
  };

  const toolbarActions = (actionsQuery.data ?? []).filter((item : any) => item.position === 'TOOLBAR');
  const tableActions = (actionsQuery.data ?? []).filter((item : any) => item.position === 'TABLE').map((item:any)=>({label: item.title, key: item.id}))

  return (
    <div>
      <ToolbarAction items={toolbarActions} onClick={handleToolbarActionClick} />
      <StandartTable
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
      />
    </div>
  )
};

export default MaintenanceTable;