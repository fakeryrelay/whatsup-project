type createFetchRequest = (
  idInstance: string,
  apiTokenInstance: string,
  method: string
) => string;

export const createFetchRequest: createFetchRequest = (
  idInstance,
  apiTokenInstance,
  method
) => {
  return `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};
