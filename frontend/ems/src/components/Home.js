import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import PersonList from './people/PersonList';
import DepartmentList from './departments/DepartmentList';


class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <h2>Structural Employee Management System</h2>
                        <div className="col-lg-6">
                            <hr />
                        </div>

                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Employees List</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Redirects to list of employees</h6>
                                    <p className="card-text">
                                        From there on, you can add a new employee or see the details of each employee
                                        in the list by following the links.
                                    </p>

                                    <Link className="link" to={`people`}>
                                        To Employees List ->
                                    </Link>
                                    <Route path={`/people`} component={PersonList} />


                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Departments List</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Redirects to list of departments</h6>
                                    <p className="card-text">
                                        From there on, you can add a new departments or
                                        see the details of each department
                                        in the list by following the links. You can also find details of each person inside the department.
                                     </p>
                                    <Link className="link" to={`departments`}>
                                        To Departments List ->
                                    </Link>
                                    <Route path={`/departments`} component={DepartmentList} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;