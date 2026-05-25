const typeDefs = `#graphql
  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String
    category: String!
    image: String
    inventory: Int!
  }

  type OrderItem {
    id: ID!
    productId: ID!
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    customerName: String!
    customerPhone: String!
    status: String!
    totalAmount: Float!
    items: [OrderItem!]!
    createdAt: String!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
  }

  type Mutation {
    updateInventory(id: ID!, newInventory: Int!): Product!
    createOrder(customerName: String!, customerPhone: String!, items: [OrderItemInput!]!): Order!
  }
`;

module.exports = typeDefs;
