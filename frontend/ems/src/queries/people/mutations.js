import { gql } from 'apollo-boost';

export const addPersonMutation = gql`
    mutation AddPerson(
        $firstName: String!,
        $lastName: String!,
        $jobTitle: String!,
        $managerId: String!,
        $departmentId: String!
    ) {
        addPerson(
            firstName: $firstName, 
            lastName: $lastName, 
            jobTitle: $jobTitle, 
            departmentId: $departmentId, 
            managerId: $managerId
        ){
            id
            firstName
            lastName
        }
    }
`;

