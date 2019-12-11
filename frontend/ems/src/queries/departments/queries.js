import { gql } from 'apollo-boost';

export const getDepartmentsQuery = gql`
    {
        departments {
            id
            name
        }
    }
`;

export const getDepartmentsDetailQuery = gql`
    {
        departments {
            id
            name
        }
    }
`;

export const getDepartmentQuery = gql`
    query GetDepartment($id: ID){
        department(id: $id) {
            id
            name
            people {
                id
                firstName
                lastName
                jobTitle
            }
        }
    }
`;