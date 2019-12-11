import { GraphQLObjectType } from "graphql";
import { deptQueries } from "./department";
import { peopleQueries } from "./people";

//department and people queries bundled into one root query exported here
const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...deptQueries,
        ...peopleQueries
    }
});

export = RootQuery;