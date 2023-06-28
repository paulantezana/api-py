import RequestApi from "helpers/RequestApi";

export const configInit = async (userId: number) => {
    const response = await RequestApi.post('/config/init', {
      body: {
        user_id: userId
      }
    })
  
    return response.result;
}

export const getActions = async (screenId: number) => {
    const response = await RequestApi.post('/config/actions', {
      body: {
        screen_id: screenId
      }
    })
  
    return response.result;
}