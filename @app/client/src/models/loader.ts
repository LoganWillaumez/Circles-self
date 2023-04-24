export enum LoaderType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}


export interface Loader {
  showLoader: boolean;
  message?: string;
  button?: string;
  type?: LoaderType;
}
