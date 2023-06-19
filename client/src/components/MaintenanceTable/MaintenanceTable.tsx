import RequestApi from "helpers/RequestApi";
import { useState } from "react";

const paginateHeader = async () => {
  const response = await RequestApi.post('http://127.0.0.1:5000/api/v1/screenentity/paginate/properties', {
    body: {
      screen_id: 1,
      page: 1,
      limit: 2
    }
  })

  return response.result;
}

const paginate = async () => {
  const response = await RequestApi.post('http://127.0.0.1:5000/api/v1/screenentity/paginate', {
    body: {
      screen_id: 1,
      page: 1,
      limit: 2
    }
  })

  return response.result;
}

const MaintenanceTable = () => {
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState([]);

  const paginateData = async () => {
    const header = await paginateHeader();
    setColumns(header);

    const data = await paginate();
    setDataset(data);
  }

  return (
    <div>

    </div>
  )
};

export default MaintenanceTable;