export interface ICategory {
  id: number;
  name: string;
}

export interface ICreateCategory {
  name: string;
}

export interface ICreateCategoryResponse {
  id: number;
}

export interface IUpdateCategory {
  id?: number;
  name?: string;
}

export interface IUpdateCategoryResponse {
  id: number;
  name: string;
}

export interface IFindAllCategoriesResponse {
  id: number;
  name: string;
}

export interface IFindCategoryByIdResponse {
  id: number;
  name: string;
}
