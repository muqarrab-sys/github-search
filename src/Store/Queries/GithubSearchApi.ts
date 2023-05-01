import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubRepo, GithubUser, SearchEntity, SearchResponse } from '../../Types/GithubSearch.types';

const queryClient = fetchBaseQuery({
  baseUrl: 'https://api.github.com/search',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: 'Bearer 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',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export const GithubSearchApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: queryClient,
  tagTypes: ['Users'],
  endpoints: builder => ({
    search: builder.query<SearchResponse<GithubUser | GithubRepo>, { query: string; page: number; entity: SearchEntity }>({
      query: args => `/${args.entity}?q=${args.query}&page=${args.page}`,
      providesTags: ['Users'],
    }),
  }),
});

export const { useSearchQuery } = GithubSearchApi;
