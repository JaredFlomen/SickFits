import PAGINATION_QUERY from '../components/Pagination';

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
    merge() {
      // Runs when the apollo client comes back from the network with the products
    },
  };
}
