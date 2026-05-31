import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($customerName: String!, $customerPhone: String!, $items: [OrderItemInput!]!) {
    createOrder(customerName: $customerName, customerPhone: $customerPhone, items: $items) {
      id
      status
      totalAmount
    }
  }
`;

export const MY_ORDERS = gql`
  query MyOrders {
    myOrders {
      id
      customerName
      status
      totalAmount
      createdAt
      items {
        id
        quantity
        price
        game {
          id
          title
          image
          stockQuantity
        }
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($rawgId: Int!, $title: String!, $price: Float!, $image: String, $stockQuantity: Int!) {
    addGame(rawgId: $rawgId, title: $title, price: $price, image: $image, stockQuantity: $stockQuantity) {
      id
      title
      stockQuantity
      addedBy {
        name
        role
        createdAt
      }
    }
  }
`;
