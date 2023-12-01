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
    saveBook(user: $user, body: $body) {
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
`

export const REMOVE_BOOK = gql`
    mutation removeBook($user: ID!, $bookId: ID!) {
        removeBook(user: $user, bookId: $bookId) {
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