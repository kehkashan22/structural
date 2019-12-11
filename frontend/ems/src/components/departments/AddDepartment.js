import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addDepartmentMutation } from '../../queries/departments/mutations';
import { getDepartmentsQuery } from '../../queries/departments/queries';

import { flowRight as compose } from 'lodash';

class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    submitForm(e) {
        e.preventDefault()
        console.log(this.state);
        // use the addDeptMutation
        this.props.addDepartmentMutation({
            variables: {
                name: this.state.name
            },
            refetchQueries: [{ query: getDepartmentsQuery }] // to get new list of departments
        });
    }
    render() {
        return (
            <form id="add-dept" onSubmit={this.submitForm.bind(this)} >
                <div className="form-group">
                    <label>Department name:</label>
                    <input className="form-control" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <button className="btn btn-primary">+ Add Department</button>
            </form>
        );
    }
}

export default compose(
    graphql(getDepartmentsQuery, { name: "getDepartmentsQuery" }),
    graphql(addDepartmentMutation, { name: "addDepartmentMutation" }),
)(AddDepartment);