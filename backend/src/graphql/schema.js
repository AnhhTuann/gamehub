const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    phone: String
    address: String
    role: String!
    isActive: Boolean!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Genre {
    id: ID!
    rawgId: Int
    name: String!
    slug: String!
  }

  type Game {
    id: ID!
    rawgId: Int!
    title: String!
    description: String
    image: String
    price: Float!
    rating: Float!
    released: String
    createdAt: String!
    stockQuantity: Int!
    genre: Genre
    addedBy: User
  }

  type CartItem {
    id: ID!
    cartId: ID!
    game: Game!
    quantity: Int!
  }

  type Cart {
    id: ID!
    userId: ID
    totalAmount: Float!
    items: [CartItem!]!
  }

  type OrderItem {
    id: ID!
    orderId: ID!
    game: Game!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    customerName: String!
    customerPhone: String!
    customerAddress: String
    status: String!
    totalAmount: Float!
    discount: Float!
    shippingFee: Float!
    items: [OrderItem!]!
    createdAt: String!
  }

  input OrderItemInput {
    rawgId: Int!
    title: String!
    price: Float!
    image: String
    quantity: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User

    games: [Game!]!
    game(id: ID!): Game
    gameByRawgId(rawgId: Int!): Game

    cart(id: ID!): Cart
    myCart: Cart

    orders: [Order!]!
    myOrders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    register(email: String!, password: String!, name: String!, phone: String, address: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    addToCart(rawgId: Int!, title: String!, price: Float!, image: String, quantity: Int!): Cart!
    removeFromCart(cartItemId: ID!): Cart!
    
    createOrder(customerName: String!, customerPhone: String!, items: [OrderItemInput!]!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
    
    addGame(rawgId: Int!, title: String!, price: Float!, image: String, stockQuantity: Int!): Game!
  }
`;

module.exports = typeDefs;
