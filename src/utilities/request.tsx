export interface RequestParams {
  url: string; //The request endpoint
  successFunc?: Function; //A function to be executed if the request is successful
  failFunc?: Function; //A function to be executed if the request fails
  finalFunc?: Function; //A function that will be always executed
}

export class HTTPRequest {
  /**
   * Performs an asynchornous request
   */
  public static async performRequest(params: RequestParams) {
    try {
      const resultRequest = await fetch(params.url);
      if (resultRequest.status !== 200) {
        throw new Error();
      }
      const jsonResult = await resultRequest.json();
      params.successFunc && params.successFunc(jsonResult);
    } catch (error) {
      params.failFunc && params.failFunc(error);
    } finally {
      params.finalFunc && params.finalFunc();
    }
  }
}
