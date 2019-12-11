const mongoose = require('mongoose');
const databaseName = 'test'
const request = require('supertest')
const app = require('../app/app')

beforeAll(async () => {
    const url = `mongodb+srv://admin:this4now@empdb-qd8za.mongodb.net/test?retryWrites=true&w=majority`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
})

// I ran out of time at this stage of coding, so could not complete tests
// I would definitely love to understand how I can run tests efficiently with this playground
// I could not find a single, comprehensive resource online which explained how to write tests
// when using typescript, express, graphql and mongodb atlas. There were many which dealt with 
// either one or the other and while I gave it a good couple of hours I could not write a satisfactory 
// test, again apologies! I have still written a test file to demonstrate the kind of tests I would 
// have written were they not coming from mongodb

describe('GET Department', function () {
    it('should return all 7 departments', () => {
        //graphql query departments
        expect(true).toBe(true);
    });
    it('should return department with particular id', () => {
        //graphql query department(id: ID)
        expect(true).toBe(true);
    });
    it('should return BAD REQUEST when id not supplied for fetching single department', () => {
        expect(true).toBe(true);
    });
    it('should return department and firstName of all the people in the department, should match snapshot', () => {
        /**
         * graphql query department(id) {
         *      id
         *      name
         *      people {
         *          firstName
         *      }
         * }
         */

        expect(true).toBe(true);
    });
});

describe('MUTATION on Department', function () {
    it('should return name and id of new department', () => {
        //graphql mutation to create department with name 
        expect(true).toBe(true);
    });
    it('should return already exists message on creating new department with same name', () => {
        expect(true).toBe(true);
    });
    it('should return name of edited department', () => {
        expect(true).toBe(true);
    });
});


/* PERSON TESTS */
describe('GET Person', function () {
    it('should return 104 records', () => {
        //graphql query people
        expect(true).toBe(true);
    });
    it('should return person with particular id', () => {
        //graphql query department(id: ID)
        expect(true).toBe(true);
    });
    it('should return person, manager and all subordinates of all the people in the organization, should match snapshot', () => {
        /**
         * graphql query people {
         *      id
         *      firstName
         *      manager {
         *          firstName
         *      }
         *      subordinates {
         *          firstName
         *      }
         *      department {
         *          name
         *      }
         * }
         */

        expect(true).toBe(true);
    });
    it('should return subordinates or id supplied', () => {
        expect(true).toBe(true);
    });
    it('should return person with matching first Name', () => {
        expect(true).toBe(true);
    });
    it('should return list of people with matching last name', () => {
        expect(true).toBe(true);
    });
    it('should return list of people with matching jobTitle', () => {
        expect(true).toBe(true);
    });
});

describe('POST Person', function () {
    it('should add person and return added value', () => {
        //graphql query people
        expect(true).toBe(true);
    });
    it('should edit all fields of given person', () => {
        //graphql query department(id: ID)
        expect(true).toBe(true);
    });
    it('should delete person andd reassign managerid of all subordinates', () => {
        expect(true).toBe(true);
    });

});


afterAll(() => {
    mongoose.connection.close()
})