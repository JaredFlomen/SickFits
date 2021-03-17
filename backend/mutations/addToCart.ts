import { KeystoneContext } from '@keystone-next/types';

function addToCart(root: any, { productId }: { productId: string }, context: KeystoneContext) {
  console.log('Adding to cart');
}

export default addToCart;