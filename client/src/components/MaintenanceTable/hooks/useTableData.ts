import { useState } from "react";

const useTableData = ({ url = '' })=> {
    const [tableData, setTableData] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);

    return [tableLoading, tableData];
}

export default useTableData;