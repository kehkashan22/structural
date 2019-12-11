import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import { graphql } from 'react-apollo';
import { getPeopleDetailQuery } from '../../queries/people/queries'
import AddPerson from './AddPerson';
import PersonDetails from './PersonDetails';

class PersonList extends Component {
    displayPersons() {
        let data = this.props.data;
        if (data.loading || !data.people) {
            return (<tr >
                <td> Loading Employees...</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>)
        } else {
            return data.people.map(person => {
                return (
                    <tr key={person.id}>
                        <td>
                            <Link className="link" to={`/person/${person.id}`}>
                                {person.firstName} {person.lastName}
                            </Link>
                            <Route path={`/person/:personId`} component={PersonDetails} />
                        </td>
                        <td>{person.jobTitle}</td>
                        <td>{person.manager ? person.manager.firstName : "-"} {person.manager ? person.manager.lastName : ""}</td>
                        <td>{person.department.name}</td>
                    </tr>
                )
            })
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>List of Employees</h2>
                        <hr />
                        <Link to={`/add/person`}>
                            <button className="btn btn-primary">
                                Add New Employee
                            </button>
                        </Link>
                        <Route path={`/add/person`} component={AddPerson} />

                        <hr />
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Manager Name</th>
                                    <th scope="col">Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.displayPersons()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(getPeopleDetailQuery)(PersonList);