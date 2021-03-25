// Simplest, it's a yes or no depending on session

import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  //If session is undefined (double !!) will return false (not signed in)
  return !!session;
}

export const permissions = {
  canManageProducts({ session }) {
    return session.data.role.canManageProducts;
  },
}