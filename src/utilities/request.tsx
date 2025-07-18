/**
 * Some parameters to mock an HTTP request.
 * @interface
 */
export interface MockRequest {
  /**
   * The object with the result of the request.
   * @type {Object}
   */
  result: any;

  /**
   * The timeout after which the request will return. Can be useful to simulate slow connections.
   */
  timeout: number;

  /**
   * True if the mocking request should fail and execute the fail function.s
   */
  shouldFail: boolean;
}

export interface RequestParams {
  /**
   * The URL of the endpoint.
   */
  url: string;

  /**
   * A function to be executed if the request is successful
   */
  successFunc?: Function;

  /**
   * A function to be executed if the request fails.
   */
  failFunc?: Function;

  /**
   * A function that will be always executed
   */
  finalFunc?: Function;

  /**
   * Mock parameters. Only for mocking requests.
   */
  mock?: MockRequest;
}

export class HTTPRequest {
  /**
   * Performs an asynchornous request.
   * Can be a real request or a mocking request.
   *
   * @param params - The request parameters
   */
  public static async performRequest(params: RequestParams) {
    if (!params.mock) {
      this.performRealRequest(params);
    } else {
      this.performMockRequest(params);
    }
  }

  /**
   * Performs an asynchornous real request
   *
   * @param params - The request parameters
   */
  public static async performRealRequest(params: RequestParams) {
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

  /**
   * Performs an asynchornous mocking request
   *
   * @param params - The request parameters
   */
  public static async performMockRequest(params: RequestParams) {
    window.setTimeout(() => {
      if (!params.mock?.shouldFail) {
        params.successFunc && params.successFunc(params.mock?.result);
      } else {
        params.failFunc && params.failFunc();
      }
      params.finalFunc && params.finalFunc();
    }, params.mock?.timeout);
  }
}
