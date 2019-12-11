import { gql } from 'apollo-boost';

export const addDepartmentMutation = gql`
    mutation AddDepartment(
        $name: String!
    ) {
        addDepartment(
            name: $name
        ){
            id
            name
        }
    }
`;