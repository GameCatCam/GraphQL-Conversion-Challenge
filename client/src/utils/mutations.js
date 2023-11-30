import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
mutation saveBook($user: ID!, $body: BookInput!) {
    saveBook(userId: $user, book: $body) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        image
        link
        description
      }
    }
  }

  input BookInput {
    bookId: ID
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId: ID!) {
        removeBook(userId: $userId, book: $bookId) {
            _id
            username
            savedBooks {
            bookId
            title
            authors
            image
            link
            description
            }
        }
    }
`