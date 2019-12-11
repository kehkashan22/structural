import { DeptType } from "../types";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import Department from '../../models/department';

export const deptQueries = {

    // returns department by ID
    /**
     * {
     *      departments {
     *             id
     *             name
     *             people {
     *                  firstName
     *                  lastName
     *                  jobTitle
     *              }
     *      }
     * }
     */
    department: {
        type: DeptType,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            try {
                return await Department.findById(args.id);
            } catch (error) {
                throw error;
            }
        }
    },

    // returns all departments in the organization as a list
    departments: {
        type: new GraphQLList(DeptType),
        args: { id: { type: GraphQLID } },
        async resolve() {
            try {
                return await Department.find({});
            } catch (error) {
                throw error;
            }
        }
    },

    //department by name
    departmentByName: {
        type: new GraphQLList(DeptType),
        args: { name: { type: GraphQLString } },
        async resolve(parent, args) {
            try {
                let name = new RegExp("^" + args.name.toLowerCase(), 'i')
                return await Department.find({ name: name })
            } catch (error) {
                throw error;
            }
        }
    }
}