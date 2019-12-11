import { GraphQLList, GraphQLString, GraphQLID } from "graphql";
import { PersonType } from "../types";
import Person from '../../models/person';
export const peopleQueries = {
    //find person by ID, requires an alphanumeric string passed as id
    /**
     * eg.:
     * {
     *      person(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
     *             firstName
     *              lastName
     *              jobTitle
     *              manager: {
     *                  id
     *                  firstName
     *                  lastName
     *                  
     *              }
     *              department: {
     *                  id
     *                  name
     *              }
     *              subordinates: {
     *                  id
     *                  firstName
     *                  lastName
     *                  jobTitle
     *              }
     *      }
     * }
     */

    person: {
        type: PersonType,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            try {
                return await Person.findById(args.id)
            } catch (error) {
                throw error;
            }
        }
    },

    //get list of all people in the organization 
    // (same use case as person, but without the id parameter)
    people: {
        type: new GraphQLList(PersonType),
        async resolve(parent, args) {
            try {
                return await Person.find({});
            } catch (error) {
                throw error;
            }

        }
    },


    //get list of all subordinates of person (REDUNDANT)
    managerOf: {
        type: new GraphQLList(PersonType),
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            try {
                return await Person.find({ managerId: args.id })
            } catch (error) {
                throw error;
            }
        }
    },


    // get person by first name (name should be an exact match)
    // case handling required, first name returns only the first matching record
    personByFName: {
        type: new GraphQLList(PersonType),
        args: { firstName: { type: GraphQLString } },
        async resolve(parent, args) {
            try {
                let firstName = new RegExp("^" + args.firstName.toLowerCase(), 'i')
                return await Person.find({ firstName: firstName })
            } catch (error) {
                throw error;
            }
        }
    },

    // get person by last name
    // exact match required, last name returns a list of people with same last name
    personByLName: {
        type: new GraphQLList(PersonType),
        args: { lastName: { type: GraphQLString } },
        async resolve(parent, args) {
            try {
                let lastName = new RegExp("^" + args.lastName.toLowerCase(), 'i')
                return await Person.find({ lastName: lastName })
            } catch (error) {
                throw error;
            }
        }
    },


    // Is there a better naming convention?

    //get list of people by job title (EXACT MATCH)
    jobTitle: {
        type: new GraphQLList(PersonType),
        args: { jobTitle: { type: GraphQLString } },
        async resolve(parent, args) {
            //case insensitive search + EXACT MATCH
            let job = new RegExp("^" + args.jobTitle.toLowerCase() + '$', 'i')
            return await Person.find({ jobTitle: job })
        }
    }

    //Is using Regex in a large database efficient or are there better ways?
}