import { gql } from 'apollo-boost';

export const getPeopleDetailQuery = gql`
    {
        people {
            id
            firstName
            lastName
            jobTitle
            manager {
                firstName
                lastName
            }
            department{
                name
            }
        }
    }
`;

export const getPeopleQuery = gql`
    {
        people {
            id
            firstName
            lastName
            jobTitle
        }
    }
`;

export const getSubordinatesQuery = gql`
    {
        people {
            id
            firstName
            lastName
            jobTitle
            subordinates {
                firstName
                lastName
                jobTitle
            }
        }
    }
`;

export const getPersonQuery = gql`
    query GetPerson($id: ID){
        person (id: $id) {
            id
            firstName
            lastName
            jobTitle
            subordinates {
                id
                firstName
                lastName
                jobTitle
            }
            manager {
                id
                firstName
                lastName
                jobTitle
            }
            department{
                id
                name
            }
        }
    }
`;