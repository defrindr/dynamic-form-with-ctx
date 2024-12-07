export type IResponseList<T> = {
  data: {
    items: T[];
    meta: {
      currentPage: number;
      path: string;
      perPage: number;
      total: number;
      totalPage: number;
    };
  };
};

export type IResponseItem<T> = {
  data: T | null;
};
