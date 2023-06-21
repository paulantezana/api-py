import RequestApi from "helpers/RequestApi";

export const getActions = async (screenId: number) => {
    const response = await RequestApi.post('/config/actions', {
      body: {
        screen_id: screenId
      }
    })
  
    return response.result;
}