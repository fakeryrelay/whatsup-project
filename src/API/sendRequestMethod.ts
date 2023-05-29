import { createFetchRequest } from "../utils/createFetchRequest";

type TypeRequestBody = {
  [prop: string]: string | number | boolean;
};

type TypeMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

type TypeSendRequestMethod = (
  idInstance: string,
  apiTokenInstance: string,
  method: string,
  HTTPMethod: TypeMethod,
  body?: TypeRequestBody
) => any;

export const sendRequestMethod: TypeSendRequestMethod = async (
  idInstance,
  apiTokenInstance,
  method,
  HTTPMethod,
  body
) => {
  const requestLink = createFetchRequest(idInstance, apiTokenInstance, method);

  let request: Response;

  if (body) {
    if (method === "deleteNotification") {
      request = await fetch(requestLink + `/${body.receiptId}`, {
        method: HTTPMethod,
        body: JSON.stringify(body),
      });
    } else {
      request = await fetch(requestLink, {
        method: HTTPMethod,
        body: JSON.stringify(body),
      });
    }
  } else {
    request = await fetch(requestLink, {
      method: HTTPMethod,
    });
  }

  const result = await request.json();
  return result;
};
