export interface ITableBaseFilter {
  page?: number;
  searchValue?: string;
  keys?: string[];
  customSearch?: { [key: string]: string; }
}
