import { GraphQLSchema } from 'graphql'
import Mutation from './mutations';
import RootQuery from './queries';

//main graphql schema consolidated here 
export = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


