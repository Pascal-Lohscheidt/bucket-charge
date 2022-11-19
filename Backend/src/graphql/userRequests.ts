import { gql } from 'graphql-request';

export const createUser = gql`
  mutation($data: UserInput!) {
    createUser(data: $data) {
        _id,
        name
    }
}
`;

export const updateUser = gql`
  mutation($id: ID!, $data: UserInput!) {
    updateUser(id: $id, data: $data) {
        _id,
        name
    }
}
`;

export const deleteUser = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
        _id,
        name
    }
}
`;

export const findUsers = gql`
  query {
    allUsers {
        data {
            _id,
            name   
        }
    }
}
`;

export const findUserById = gql`
  query($id: ID!) {
    findUserByID(id: $id) {
        _id,
        name
    }
}
`;
