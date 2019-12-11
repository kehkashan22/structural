import { DeptType } from "../types";
import Department from '../../models/department';
import { GraphQLNonNull, GraphQLString } from "graphql";
import uuid from "uuid";

export const deptMutations = {
    // add Department, input is name
    // DOES NOT CHECK FOR ALREADY EXISTING DEPT
    // TO DO TO RESOLVE THIS BUG
    addDepartment: {
        type: DeptType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent, args) {
            try {
                let department = new Department({
                    _id: uuid(),
                    name: args.name
                });
                return await department.save();
            } catch (error) {
                throw error;
            }
        }
    },

    //edit Department name
    editDepartment: {
        type: DeptType,
        args: {
            id: {
                name: 'id',
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: new GraphQLNonNull(GraphQLString),
            }
        },
        async resolve(parent, params) {
            try {
                return await Department.findByIdAndUpdate(
                    params.id,
                    { $set: { name: params.name } },
                    { new: true }
                );
            } catch (error) {
                throw error;
            }
        }
    },

    // deleteDepartment: {} 
    //how to handle people in that department? 
    //is there a temporary department that all records must be assigned to?
    // should I first delete department and then on success update departmentId for people?
    // what if update of departmentId fails?


}