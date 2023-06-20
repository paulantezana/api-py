import RequestApi from "helpers/RequestApi";
import { useEffect, useMemo, useState } from "react";
import StandartTable from "./StandartTable";
import { useQuery } from '@tanstack/react-query'
import { PaginationState } from "@tanstack/react-table";

const paginateHeader = async (screenId : number) => {
  const response = await RequestApi.post('/screenentity/paginate/properties', {
    body: {
      screen_id: screenId
    }
  })

  return response.result.header;
}

const paginate = async ({ pageIndex, pageSize } : any ) => {
  const response = await RequestApi.post('/screenentity/paginate', {
    body: {
      screen_id: 4,
      page: pageIndex + 1,
      limit: pageSize
    }
  })

  return response.rows;
}

const MaintenanceTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const pagination = useMemo(() => ({ pageIndex, pageSize }),[pageIndex, pageSize])

  const paginateHeaderQuery = useQuery({
    queryKey: ['paginateHeader'],
    queryFn: ()=> paginateHeader(4)
  });

  const paginationQuery = useQuery({
    queryKey: ['pagination'],
    queryFn: ()=>paginate({ pageIndex, pageSize }),
  });

  return (
    <div>
      <StandartTable
        columns={paginateHeaderQuery.isLoading ? [] : paginateHeaderQuery.data }
        dataset={paginationQuery.isLoading ? [] : paginationQuery.data }
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
};

export default MaintenanceTable;