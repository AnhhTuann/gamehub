import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($categoryId: ID, $brandId: ID, $search: String) {
    products(categoryId: $categoryId, brandId: $brandId, search: $search) {
      id
      title
      price
      description
      category
      brand
      image
      inventory
      createdAt
      variants {
        id
        sku
        color
        size
        price
        inventory
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      category
      image
      inventory
      createdAt
      variants {
        id
        sku
        color
        size
        price
        inventory
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
