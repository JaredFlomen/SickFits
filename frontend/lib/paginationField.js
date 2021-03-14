import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    // Tells apollo we will handle logic
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const { count } = data?._allProductsMeta;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items, and there aren't enough items to satisfy how many were requested, and we are on the last page, THEN, send items
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }
      // If there are items, return them from the cache, don't need to go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} in the cache, will send to Apollo`
        );
        return items;
      }
      // Fallback to network
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // Runs when the apollo client comes back from the network with the products
      console.log(
        `Merging items from the networking: ${incoming.length} items`
      );
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i + 1) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}