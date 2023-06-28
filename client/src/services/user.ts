import RequestApi from "helpers/RequestApi";

export const userLogin = async (credentials:any) => {
    const response = await RequestApi.post('/user/login', {
        body: credentials
    })

    return response.result;
}