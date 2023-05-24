import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubSearchResult } from '~/Types/GithubSearch.types';

const queryClient = fetchBaseQuery({
  baseUrl: 'https://api.github.com/search',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: import.meta.env.VITE_GITHUB_KEY,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export const GithubSearchApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: queryClient,
  tagTypes: ['Users'],
  endpoints: builder => ({
    searchUsers: builder.query<GithubSearchResult, { query: string; page: number }>({
      serializeQueryArgs: ({ endpointName }) => endpointName,
      query: args => {
        return `/users?q=${args.query}&page=${args.page}`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.total_count = newItems.total_count;
        currentCache.incomplete_results = newItems.incomplete_results;

        if (otherArgs.arg.page === 1) {
          currentCache.items = newItems.items;
        } else {
          currentCache.items.push(...newItems.items);
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page || currentArg?.query !== previousArg?.query;
      },
    }),
    searchRepos: builder.query<GithubSearchResult, { query: string; page: number }>({
      serializeQueryArgs: ({ endpointName }) => endpointName,
      query: args => {
        return `/repositories?q=${args.query}&page=${args.page}`;
      },
      merge: (currentCache, newItems, otherArgs) => {
        currentCache.total_count = newItems.total_count;
        currentCache.incomplete_results = newItems.incomplete_results;

        if (otherArgs.arg.page === 1) {
          currentCache.items = newItems.items;
        } else {
          currentCache.items.push(...newItems.items);
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page || currentArg?.query !== previousArg?.query;
      },
    }),
  }),
});

export const { useSearchUsersQuery, useSearchReposQuery } = GithubSearchApi;
