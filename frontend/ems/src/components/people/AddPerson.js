import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getDepartmentsQuery } from '../../queries/departments/queries';
import { getPeopleQuery } from '../../queries/people/queries';
import { addPersonMutation } from '../../queries/people/mutations'

class AddPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            jobTitle: '',
            managerId: '',
            departmentId: ''
        };
        this.tempState = { ...this.state }
    }
    displayDepartments() {
        var data = this.props.getDepartmentsQuery;
        if (data.loading) {
            return (<option disabled>Loading departments...</option>);
        } else {
            return data.departments.map(dept => {
                return (<option key={dept.id} value={dept.id}>{dept.name}</option>);
            });
        }
    }

    displayManagers() {
        var data = this.props.getPeopleQuery;
        if (data.loading) {
            return (<option disabled>Loading potential managers...</option>);
        } else {
            return data.people.map(person => {
                return (<option key={person.id} value={person.id}>{person.firstName} {person.lastName} - {person.jobTitle}</option>);
            });
        }
    }
    submitForm(e) {
        e.preventDefault()
        console.log(this.state.firstName);
        //use the addPersonMutation
        // TO DO: add callback function and display new person on the page
        this.props.addPersonMutation({
            variables: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                jobTitle: this.state.jobTitle,
                departmentId: this.state.departmentId,
                managerId: this.state.managerId
            },
            refetchQueries: [{ query: getPeopleQuery }]
        }).then((res) => {
            this.props.history.push(`/person/${res.data.addPerson.id}`)
        }).catch(error => alert("Could not create!"));
    }

    successUser(user) {
        if (user) {
            return (
                <div>
                    <p>First Name: {user.firstName}</p>
                </div>
            )
        }
        else {
            return (<div></div>)
        }

    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Add New Employee:</h2>
                        <hr />
                        <form id="add-employee" onSubmit={this.submitForm.bind(this)} >
                            <div className="form-group">
                                <label>First name:</label>
                                <input className="form-control" type="text" onChange={(e) => this.setState({ firstName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Last name:</label>
                                <input className="form-control" type="text" onChange={(e) => this.setState({ lastName: e.target.value })} />
                            </div>
                            {/* TO DO: fetch available jobs and set a list of job titles allowed*/}
                            <div className="form-group">
                                <label>Job Title:</label>
                                <input className="form-control" type="text" onChange={(e) => this.setState({ jobTitle: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Department:</label>
                                <select className="form-control" onChange={(e) => this.setState({ departmentId: e.target.value })} >
                                    <option>Select Department</option>
                                    {this.displayDepartments()}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Department:</label>
                                <select className="form-control" onChange={(e) => this.setState({ managerId: e.target.value })} >
                                    <option>Select Manager</option>
                                    {this.displayManagers()}
                                </select>
                            </div>
                            <button className="btn btn-primary">+ Add Employee</button>
                        </form>
                        <div className="col-lg-12">
                            {this.successUser()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getDepartmentsQuery, { name: "getDepartmentsQuery" }),
    graphql(getPeopleQuery, { name: "getPeopleQuery" }),
    graphql(addPersonMutation, { name: "addPersonMutation" })
)(AddPerson);