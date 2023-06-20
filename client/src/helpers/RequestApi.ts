import { BACKEND_IP } from "./settings";

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export interface ApiResponse {
  StatusCode?: number;
  statusCode?: number;
  Message?: string;
  message?: string;
}

const codeMessage: Record<number, string> = {
  200: "El servidor devolvió con éxito los datos solicitados.",
  201: "Datos nuevos o modificados son exitosos.",
  202: "Una solicitud ha ingresado a la cola de fondo (tarea asíncrona).",
  204: "Eliminar datos con éxito.",
  400: "La solicitud se envió con un error. El servidor no realizó ninguna operación para crear o modificar datos.",
  401: "El usuario no tiene permiso (token, nombre de usuario, contraseña es incorrecta).",
  403: "El usuario está autorizado, pero el acceso está prohibido.",
  404: "La solicitud se realizó a un registro que no existe y el servidor no funcionó.",
  406: "El formato de la solicitud no está disponible.",
  410: "El recurso solicitado se elimina permanentemente y no se obtendrá de nuevo.",
  422: "Al crear un objeto, se produjo un error de validación.",
  500: "El servidor tiene un error, por favor revise el servidor.",
  502: "Error de puerta de enlace.",
  503: "El servicio no está disponible, el servidor está temporalmente sobrecargado o mantenido.",
  504: "La puerta de enlace agotó el tiempo.",
};

class RequestApi {
  private static setHeaders(options: RequestOptions): RequestOptions {
    if (!(options.body instanceof FormData)) {
      options.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...options.headers,
      };
      options.body = JSON.stringify(options.body);
    } else {
      options.headers = {
        Accept: "application/json",
        ...options.headers,
      };
    }
    return options;
  }

  private static checkStatus(response: Response): Response {
    // console.log(response, '_FETCH_RESPONSE');
    return response;

    // if (response.status >= 200 && response.status < 300) {
    //   return response;
    // }

    // const errortext = codeMessage[response.status] || response.statusText;

    // notification.error({
    //   message: 'ERROR NO CONTROLADO',
    //   description: errortext,
    // });

    // return response;

    // let error = new Error(errortext);
    // error.name = response.status;
    // error.response = response;
    // throw error;
  }

  public static async send(path: string, options: RequestOptions = {}): Promise<any> {
    const newOptions = RequestApi.setHeaders(options);
    const urlPath = BACKEND_IP + path;

    return fetch(urlPath, newOptions)
      .then(RequestApi.checkStatus)
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        return e;
      })
      // .finally((e) => {});
  }

  public static post(path: string, options: RequestOptions = {}): Promise<any> {
    return RequestApi.send(path, { method: "POST", ...options });
  }

  public static put(path: string, options: RequestOptions = {}): Promise<any> {
    return RequestApi.send(path, { method: "PUT", ...options });
  }

  public static delete(path: string, options: RequestOptions = {}): Promise<any> {
    return RequestApi.send(path, { method: "DELETE", ...options });
  }

  public static get(path: string, options: RequestOptions = {}): Promise<any> {
    return RequestApi.send(path, { method: "GET", ...options });
  }
}

export default RequestApi;
