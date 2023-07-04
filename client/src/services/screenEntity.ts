import RequestApi from "helpers/RequestApi";

export const screenEntityPaginateProperties = async (screenId: number) => {
    const response = await RequestApi.post('/screenentity/paginate/properties', {
        body: {
            screen_id: screenId
        }
    })

    return response.result;
}

export const screenEntityPaginate = async ({ pageIndex, pageSize, screenId, sorting }: any) => {
    const response = await RequestApi.post('/screenentity/paginate', {
        body: {
            screen_id: screenId,
            page: pageIndex + 1,
            limit: pageSize,
            sorter: sorting.map((item:any)=>({ field: item.id, desc: item.desc }))
        }
    })

    return response.result;
}