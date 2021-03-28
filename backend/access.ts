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

//Rule based functions
//Rules can return a boolean or a filter which limits which products they can CRUD
export const rules = {
  canManageproducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    //Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    //If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageProducts({ session })) {
      //They can read everything
      return true;
    }
    //They should see only available products based on status false
    return { status: 'AVAILABLE' }
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    //Do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    //If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    //Do they have the permission of canManageCart
    if (permissions.canManageCart({ session })) {
      return true;
    }
    //If not, do they own this item?
    return { order: { user: { id: session.itemId } }};
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    //Do they have permissions
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    //Otherwise they may only update themselves
    return { user: { id: session.itemId } };
  },
}