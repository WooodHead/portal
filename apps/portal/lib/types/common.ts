/** @format */

export const SOAP_DATE_NULL = '0000-12-31T21:29:43.000Z';

export interface StyleProps {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

export type Data<K extends string, V> = {
  [P in K]?: V;
};

export interface DataReturn<K = unknown> {
  return: K;
}

export interface DataError {
  attributes?: {
    'xsi:type'?: string;
  };
  description?: string;
  subject?: string;
}

export interface DataItems<K = unknown> {
  items: K[];
}

export interface DataUser<K = unknown> {
  user: K;
}

export interface DataFiles<K = unknown> {
  files: K[];
}

export interface DataObjects<K = unknown> {
  objects: K[];
}

export interface DataObject<K = unknown> {
  object: K;
}

export interface DataResult<K = unknown> {
  0?: DataReturn<K>;
}
