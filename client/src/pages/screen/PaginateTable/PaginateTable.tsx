import MaintenanceTable from "components/MaintenanceTable/MaintenanceTable";
import { useParams } from "react-router-dom";

export default function PaginateTable () {
  const { screenId } = useParams();
  console.log(screenId, 'screenId__________');

  return (
    <div>
      <MaintenanceTable screenId={Number(screenId)}  />
    </div>
  );
}
