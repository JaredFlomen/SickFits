// Simplest, it's a yes or no depending on session

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  //If session is undefined (double !!) will return false (not signed in)
  return !!session;
}

const generatedPermissions = Object.fromEntries(permissionsList.map(permission => [
  permission,
  function ({ session }: ListAccessArgs) {
    return !!session?.data.role?.[permission]
  }
]));

//Permissions check if someone meets a critera, yes or no
export const permissions = {
  ...generatedPermissions,
}