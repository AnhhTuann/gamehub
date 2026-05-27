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

  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type Brand {
    id: ID!
    name: String!
  }

  type ProductVariant {
    id: ID!
    productId: ID!
    sku: String
    color: String
    size: String
    price: Float!
    inventory: Int!
    product: Product
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    image: String
    category: Category
    brand: Brand
    variants: [ProductVariant!]!
    createdAt: String!
  }

  type CartItem {
    id: ID!
    cartId: ID!
    productVariant: ProductVariant!
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
    productVariant: ProductVariant!
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

  type Coupon {
    id: ID!
    code: String!
    type: String!
    value: Float!
    expiryDate: String
    usageLimit: Int
    usedCount: Int!
    isActive: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User

    categories: [Category!]!
    brands: [Brand!]!

    products(categoryId: ID, brandId: ID, search: String): [Product!]!
    product(id: ID!): Product

    cart(id: ID!): Cart
    myCart: Cart

    orders: [Order!]!
    myOrders: [Order!]!
    order(id: ID!): Order

    coupons: [Coupon!]!
  }

  type Mutation {
    register(email: String!, password: String!, name: String!, phone: String, address: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    createCategory(name: String!, slug: String!): Category!
    createBrand(name: String!): Brand!

    createProduct(title: String!, description: String!, image: String, categoryId: ID, brandId: ID): Product!
    updateProduct(id: ID!, title: String, description: String, image: String, categoryId: ID, brandId: ID): Product!
    deleteProduct(id: ID!): Boolean!

    createProductVariant(productId: ID!, sku: String, color: String, size: String, price: Float!, inventory: Int!): ProductVariant!
    updateProductVariant(id: ID!, sku: String, color: String, size: String, price: Float, inventory: Int): ProductVariant!

    addToCart(cartId: ID, productVariantId: ID!, quantity: Int!): Cart!
    removeFromCart(cartId: ID!, cartItemId: ID!): Cart!
    
    createOrder(cartId: ID!, customerName: String!, customerPhone: String!, customerAddress: String!, couponCode: String): Order!
    updateOrderStatus(id: ID!, status: String!): Order!

    createCoupon(code: String!, type: String!, value: Float!, expiryDate: String, usageLimit: Int): Coupon!
  }
`;

module.exports = typeDefs;
