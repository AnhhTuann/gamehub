import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetGames {
    games {
      id
      title
      price
      description
      image
      stockQuantity
      createdAt
      addedBy {
        name
        role
        createdAt
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      price
      description
      image
      stockQuantity
      createdAt
      addedBy {
        name
        role
        createdAt
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      slug
    }
  }
`;

export const GET_BRANDS = gql`
  query GetBrands {
    brands {
      id
      name
    }
  }
`;
