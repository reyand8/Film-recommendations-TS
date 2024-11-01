import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
    mutation SignUpMutation(
        $email: String!
        $password: String!
        $username: String!) {
        signUpUser(
            email: $email
            password: $password
            username: $username
        ) {
            token
        }
    }
`;

export const SIGN_IN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        signInUser(
            email: $email, 
            password: $password) {
            token
        }
    }
`;

export const UPDATE_USER = gql `
    mutation UpdateUserMutation(
        $email: String!
        $username: String!
        $selectedFilms: String
    ) {
        updateUser(email: $email, username: $username, selectedFilms: $selectedFilms) {
            email
            username
            selectedFilms
        }
    }
`;

export const DELETE_USER = gql `
    mutation DeleteUserMutation {
        deleteUser
    }
`;