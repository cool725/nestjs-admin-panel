import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Pagination {
  page?: number;
  skip?: number;
  limit?: number;
  sort?: { field: string; by: 'ASC' | 'DESC' }[];
  search?: { field: string; value: string }[];
}

export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const query = req['query'] || req.body;
    const search = query.search || query.searchValue;

    const paginationParams: Pagination = {
      page: (query.page > 0 ? query.page : 1) || 1,
      skip: 0,
      limit: query.limit ? parseInt(query.limit) : 10,
      sort: [],
      search: [],
    };

    paginationParams.skip =
      (paginationParams.page - 1) * paginationParams.limit;

    // create array of sort
    if (query.sort) {
      const sortArray = query.sort.toString().split(',');
      paginationParams.sort = sortArray.map((sortItem) => {
        const sortBy = sortItem[0];
        switch (sortBy) {
          case '-':
            return {
              field: sortItem.slice(1),
              by: 'ASC',
            };
          case '+':
            return {
              field: sortItem.slice(1),
              by: 'ASC',
            };
          default:
            return {
              field: sortItem.trim(),
              by: 'DESC',
            };
        }
      });
    }

    // create array of search
    if (search) {
      const searchArray = search.toString().split(',');
      paginationParams.search = searchArray.map((searchItem) => {
        let field = searchItem.split(':')[0];
        let value = searchItem.split(':')[1];

        if ((value === undefined && field) || field == 'all') {
          value = value || field;
          field = null;
        }

        return {
          field,
          value,
        };
      });
    }

    return paginationParams;
  }
);
