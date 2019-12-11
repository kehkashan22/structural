import uuid from "uuid";
import { PersonType } from "../types";
import { GraphQLNonNull, GraphQLString, GraphQLID } from "graphql";
import Person from '../../models/person';
import { resolve } from "dns";

export const peopleMutations = {
    // add Person 
    /**
     * mutation {
     *  addPerson(
            firstName: "Kehkashan",
            lastName: "Fazal",
            jobTitle: "Software Engineer",
            departmentId: "aef293ee-8dcc-4d89-99cf-1b8f61bab07b",
            managerId: "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
        ){
            firstName
            manager {
            firstName
            }
        }
     * }
     */
    addPerson: {
        type: PersonType,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            jobTitle: { type: new GraphQLNonNull(GraphQLString) },
            departmentId: { type: new GraphQLNonNull(GraphQLString) },
            managerId: { type: GraphQLString } // needs some other checks to ensure does not break the code
        },
        // check for unique record out of scope
        // can create duplicate records - sorry!
        async resolve(parent, args) {
            try {
                console.log(args.firstName)
                let person = new Person({
                    _id: uuid(),
                    firstName: args.firstName,
                    lastName: args.lastName,
                    jobTitle: args.jobTitle,
                    departmentId: args.departmentId,
                    managerId: args.managerId
                });
                return await person.save();
            } catch (error) {
                throw error;
            }
        }
    },

    //edit existing person with particular id (requires ALL fields to be set)

    // I would check for non null values on frontend and send a whole new object to the backend, 
    // created from existing and new values to ensure there are no ghost variables
    // in mongoDB only a few values can also be sent, as opposed to all the values
    // this is a to do for the next commit, since this is not the most optimized way to edit

    editPerson: {
        type: PersonType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLString)
            },
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            jobTitle: { type: new GraphQLNonNull(GraphQLString) },
            departmentId: { type: new GraphQLNonNull(GraphQLString) },
            managerId: { type: GraphQLString }
        },

        async resolve(parent, params) {
            try {
                return await Person.findByIdAndUpdate(
                    params.id,
                    {
                        $set: {
                            firstName: params.firstName,
                            lastName: params.lastName,
                            jobTitle: params.jobTitle,
                            managerId: params.managerId,
                            departmentId: params.departmentId
                        }
                    },
                    { new: true }
                )
            } catch (error) {
                throw error;

            }
        }
    },

    // changeManager: {},

    // transferDepartment: {},
    // currently not managing how to reassign managerId for subordinates
    //NECASSARY TO DO: handle managerId for subordinates
    deletePerson: {
        type: PersonType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(parent, params) {
            try {
                return await Person.findByIdAndDelete(params.id)
            } catch (error) {
                throw error;

            }
        }
    },

    //how to handle subordinates? //will they be assigned to another manager? //manager of person being deleted as a temporary solution?

}