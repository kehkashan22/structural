import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPersonQuery } from '../../queries/people/queries';

class PersonDetails extends Component {
    constructor(props) {
        super(props)
        console.log('props:', props)
        let route = props.match.url;
        console.log(route)
    }
    displayPersonDetails() {
        const { person } = this.props.data;
        console.log('person', this.props.data);
        if (person) {
            return (
                <div>
                    <h1>{person.firstName} {person.lastName}</h1>
                    <h3>{person.jobTitle}</h3>
                    <hr />
                    <h5>Manager:</h5>
                    {person.manager ?
                        <p>
                            {/* Adding recursive links led to memory overflow. 
                            Given more time, I would love to add a feature to recursively link each person */}
                            {/* <Link to={`/person/${person.manager.id}`}> */}
                            {person.manager.firstName} {person.manager.lastName} - {person.manager.jobTitle}
                            {/* </Link>
                            <Route path={`/person/:personId`} component={PersonDetails} /> */}
                        </p>
                        : <p>Top of the chain, needs no manager!</p>}

                    <h5>Department:</h5>
                    <p>{person.department.name}</p>
                    <h5>Subordinates:</h5>
                    <ul className="list-group">
                        {person.subordinates.map(item => {
                            return <li className="list-group-item" key={item.id}>{item.firstName} {item.lastName} - {item.jobTitle}</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>Loading employee details...</div>);
        }
    }
    render() {
        return (
            <div id="person-details">
                {this.displayPersonDetails()}
            </div>
        );
    }
}

export default graphql(getPersonQuery, {
    options: (props) => {
        console.log('props here:', props.match.params.personId)
        return {
            variables: {
                id: props.match.params.personId
            }
        }
    }
})(PersonDetails);