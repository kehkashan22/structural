import { GraphQLObjectType } from "graphql";
import { peopleMutations } from "./people";
import { deptMutations } from "./department";

const Mutation: GraphQLObjectType = new GraphQLObjectType({
    name: 'MutationQueryType',
    fields: {
        ...peopleMutations,
        ...deptMutations
    }
});

export = Mutation;