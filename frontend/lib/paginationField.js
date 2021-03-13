export default function paginationField() {
  return {
    // Tells apollo we will handle logic
    keyArgs: false,
    read(exisiting = [], { args, cache }) {
      // Asks the read function for the items
      // Return the items bc already in cache
      // Or, return false, which makes a network request
    },
    merge() {
      // Runs when the apollo client comes back from the network with the products
    },
  };
}
