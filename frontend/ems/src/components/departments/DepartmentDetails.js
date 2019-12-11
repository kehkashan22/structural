import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import { getDepartmentQuery } from '../../queries/departments/queries';
import PersonDetails from '../people/PersonDetails';

class DepartmentDetails extends Component {

    displayDepartmentDetails() {
        const { department } = this.props.data;
        if (department) {
            return (
                <div>
                    <h2>{department.name} Department</h2>
                    <p>People in the department:</p>
                    <ul className="list-group">
                        {department.people.map(item => {
                            return <li className="list-group-item" key={item.id}>
                                <Link className="link" to={`/person/${item.id}`}>
                                    {item.firstName} {item.lastName} - {item.jobTitle}
                                </Link>
                                <Route path={`/person/:personId`} component={PersonDetails} />
                            </li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>No department selected...</div>);
        }
    }
    render() {
        return (
            <div id="department-details">
                {this.displayDepartmentDetails()}
            </div>
        );
    }
}

export default graphql(getDepartmentQuery, {
    options: (props) => {
        console.log('props here:', props.match.params.deptId)
        return {
            variables: {
                id: props.match.params.deptId
            }
        }
    }
})(DepartmentDetails);