export interface ICategory {
  id: number;
  name: string;
}

export interface ICreateCategory {
  name: string;
}

export interface IUpdateCategory {
  name?: string;
}

export interface ICategoryResponse {
  id: number;
}

export interface ICategoryDetails {
  id: number;
  name: string;
}
