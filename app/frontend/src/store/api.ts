import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const tags: Record<string, string> = {};


const api = createApi({
  baseQuery: fetchBaseQuery({
    // TODO
    baseUrl: 'env.apiBaseUrl',
    prepareHeaders: async (headers) => {
      // TODO
      const tkn = "";
      if (!headers.get('Authorization') && tkn) {
        headers.set('Authorization', `Bearer ${tkn}`);
      }

      return headers;
    },
  }),
  reducerPath: 'api',
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    
  }),
});

export default api;
