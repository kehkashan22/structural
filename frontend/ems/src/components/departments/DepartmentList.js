import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import { getDepartmentsQuery } from '../../queries/departments/queries'
import AddDepartment from './AddDepartment';
import DepartmentDetails from './DepartmentDetails';

class DepartmentList extends Component {
    displayDepartments() {
        let data = this.props.data;
        if (data.loading) {
            return (<div>Loading Departments...</div>)
        } else {
            return data.departments.map(dept => {
                return (
                    <li key={dept.id} className="list-group-item">
                        <Link className="link" to={`department/${dept.id}`}>
                            {dept.name}
                        </Link>
                        <Route path={`/department/:deptId`} component={DepartmentDetails} />
                    </li>
                )
            })
        }
    }
    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>List of Departments </h2>
                        <h4>(Click on Departments to see details!)</h4>
                        <hr />
                        <ul className="list-group">
                            {this.displayDepartments()}
                        </ul>
                        <hr />
                        <AddDepartment />
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(getDepartmentsQuery)(DepartmentList);