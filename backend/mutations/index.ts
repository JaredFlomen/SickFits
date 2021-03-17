import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';

//Fake graphql tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productID: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart: function () {
        //Custom code

      }
    }
  }
})