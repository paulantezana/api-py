import RequestApi from "helpers/RequestApi";
import { useEffect, useState } from "react";
import StandartTable from "./StandartTable";

const paginateHeader = async (screenId : number) => {
  const response = await RequestApi.post('/screenentity/paginate/properties', {
    body: {
      screen_id: screenId
    }
  })

  return response.result.header;
}

const paginate = async () => {
  const response = await RequestApi.post('/screenentity/paginate', {
    body: {
      screen_id: 4,
      page: 1,
      limit: 2
    }
  })

  return response.data;
}

const MaintenanceTable = () => {
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState([]);

  const loadTableProperties = async () => {
    const headerData = await paginateHeader(4);
    setColumns(headerData);
  }

  const loadTable = async () => {
    const data = await paginate();
    setDataset(data);
  }

  useEffect(()=>{
    loadTableProperties();
    loadTable();
  },[])

  return (
    <div>
      <StandartTable columns={columns} dataset={dataset} />
    </div>
  )
};

export default MaintenanceTable;