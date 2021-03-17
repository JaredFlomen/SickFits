import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(root: any, { productId }: { productId: string }, context: KeystoneContext): Promise<CartItemCreateInput> {
  console.log('Adding to cart');
  //Query the current user and see if signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in!')
  }
  //Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveField: 'id,quantity'
  });
  const [existingCartItem] = allCartItems;
  //See if item is already in cart
  //If exists, increment by 1
  if (existingCartItem) {
    console.log(`There are already ${existingCartItem.quantity}, increment by 1`);
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 }
    });
  }
  //If not, create new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    }
  });
}

export default addToCart;