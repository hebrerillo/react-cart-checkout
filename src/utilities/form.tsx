/**
 * Some utilities related to forms
 */
export interface FormRequest {
  successFunc?: Function | null;
  failFunc?: Function | null;
  finalFunc?: Function | null;
  formData?: Object | null;
}
