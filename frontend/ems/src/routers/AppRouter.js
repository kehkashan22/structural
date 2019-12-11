import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import PersonList from '../components/people/PersonList';
import DepartmentList from '../components/departments/DepartmentList'
import Home from '../components/Home';
import AddPerson from '../components/people/AddPerson';
import PersonDetails from '../components/people/PersonDetails';
import DepartmentDetails from '../components/departments/DepartmentDetails';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Switch>
                            <Route path="/" component={Home} exact={true} />
                            <Route path="/departments" component={DepartmentList} />
                            <Route path="/people" component={PersonList} />
                            <Route path="/department/:deptId" component={DepartmentDetails} />
                            <Route path="/person/:personId" component={PersonDetails} />
                            <Route path="/add/person" component={AddPerson} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;

