import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} from 'graphql';

import Person from '../models/person';
import Department from '../models/department';

//since there are only two types, they are maintained in a single types file, 
// these can be further refactored into their own files, 
// however there is inter-dependency among these types (one is nested in another)
// so further thought needs to be given on how to refactor them

// used GRAPHQLObjectType as opposed to buildSchema since I wanted to use nesting
// and graphql-tools was overkil for a project of this size

//Person Type
/**
 * {
 *      id: ID!
 *      firstName: String!
 *      lastName: String!
 *      jobTitle: String!
 *      managerId: String        // not a strict requirement to account for 'CEO' position
 *      departmentId: String!
 *      department: [DeptType!]!
 *      manager: PersonType or null
 *      subordinates: [PersonType] or []  
 *      
 * }
 */
export const PersonType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID! },
        firstName: { type: GraphQLString! },
        lastName: { type: GraphQLString! },
        genre: { type: GraphQLString! },
        jobTitle: { type: GraphQLString! },
        managerId: { type: GraphQLString },
        departmentId: { type: GraphQLString },
        department: {
            type: DeptType,
            async resolve(parent, args) {
                //returns department the person belongs to
                return await Department.findById(parent.departmentId)
            }
        },
        manager: {
            type: PersonType,
            async resolve(parent, args) {
                // returns manager of person
                return await Person.findById(parent.managerId)
            }
        },
        subordinates: {
            type: new GraphQLList(PersonType),
            async resolve(parent, args) {
                // returns list of all people who have their managerId set as id of this person
                return await Person.find({ managerId: parent.id })
            }
        }
    })
});



// Department Type 
/**
 * {
 *      id: ID!
 *      name: String!
 *      people: [PersonType]!  
 * }
 */
export const DeptType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Department',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        people: {
            type: new GraphQLList(PersonType),
            // returns list of all the people inside that department 
            async resolve(parent, args) {
                return await Person.find({ departmentId: parent.id })
            }
        }
    })
});