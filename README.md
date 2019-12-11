
# Structural Programming Challenge

  

This small use case full-stack app uses a provided JSON dataset to build a GraphQL server to return data about the users, hierarchy, and relationships within. A MongoDB database is seeded using the JSON data, which is then connected to the backend using Express and Mongoose and frontend is built using React with Apollo.

*Note:* This project is not ready for production as it needs many bug fixes.

 
### Description of Data

  

Using two mongo Schemas - Person and Department, I built two collections - people and department in an *empdb* db. Following is a description of the data.

  

- Each person has an id, firstName, lastName, jobTitle, departmentId, and managerId.

- The person with jobTitle “CEO” is the root of the hierarchy and has no managerId.

- Each departmentId corresponds to a row in the Departments, which also contains the name of the department.

  

## Getting Started

  

Download a copy of the repository or clone it using:

  

```
git clone https://github.com/kehkashan22/structural.git

```

  

### Prerequisites

  

The project requires npm and node installed in the local machine. Since I have used MongoDB Atlas to host my database, this project also assumes a working internet connection in order to reproduce the results as shown here.

***Note***: Since this is an example project, the mongo database has all IPs whitelisted and should accept an incoming request from any machine. I will close this connection once testing is done.

  
  

### Installing

  

The project can be run two ways:

  

- Within a graphql playground (to see the functioning of some extra apis, not yet available on frontend)

- Using the React frontend

  

I will outline ways to run both.

  
  
  

***Note:*** There are two folders inside the root folder - frontend and backend, both have seperate **package.json** from where their respective node_modules can be installed. At the root there is a separate package.json from where the frontend and backend can be run concurrently.

  

1. After downloading the project, cd into the root and install all dependencies at the root (concurrently package) using

```
cd structural 
~/structural> npm install
```

  

2. To download dependencies for backend, from the root (structural):

```
~/structural> cd backend && cd server && npm install
```

 
3. To download dependencies for frontend, from the root (structural):

```
~/structural> cd frontend && cd ems && npm install
```

  

4. Once dependencies are installed, **cd back to the root** and run the following command (structural):

```
~/structural> npm run dev
```

This command starts the frontend and backend concurrently.

  

You can now access the frontend at: [http://localhost:3000](http://localhost:3000).

The backend graphql playground can be accessed at: [http://localhost:4000/graphql](http://localhost:4000/graphql).

 
  **Note**: If both fail to start concurrently, please use the following commands from root, on two separate terminals:
  ```
  ~/structural> cd frontend && cd ems && npm start
  ~/structural> cd backend && cd server && npm run dev
  ```
  
##  Frontend

Frontend is self explanatory. However, only viewing and adding of new departments and employees is allowed from the frontend. Edit and delete functionalities can be seen from the backend.

## Backend APIs

 
You can try the following queries and mutation on the backend.

  
### TypeDefs:

#### PersonType
* ***Params***
	* id: ID!
	* firstName: String!
	* lastName: String!
	* jobTitle: String!
	* managerId: String!
	* departmentId: String!
	* manager: PersonType
	* subordinates: [PersonType!]
	* department: DeptType!
	
#### DeptType
* ***Params***
	* id: ID!
	* name: String!
	* people: [PersonType!]
	
### Query:
#### People Queries:

  
* All People in the company
	```
	{
		people {
			id
			firstName
			lastName
			jobTitle
			manager {
				id
				firstName
				lastName
				jobTitle
			}
			subordinates {
				id
				firstName
				lastName
				jobTitle
			}
			department {
				id
				name
			}
		}
	}
	```

* By ID 
	* example will return record with first name = Ofelia
	```
	{
	  person (id: "24341d42-8235-47a1-9ec5-c6afcbdcef16") {
	    firstName
	    lastName
	    jobTitle
	    subordinates {
	      id
	      firstName
	      lastName
	      jobTitle
	    }
	    department {
	      id
	      name
	    }
	  }
	}
	```

 * By First Name (case insensitive, will accept incomplete strings)
	  * asia
	  * Asia
	  * as
	  will all return person named Asia
	  ```
	 {
		personByFName (firstName: "asia") {
		    firstName
		    lastName
		    jobTitle
		    manager {
		      id
		      firstName
		      lastName
		      jobTitle
		    }
		    department {
		      id
		      name
		    }
		 }
	} 
	  ```


* By Last Name (case insensitive, will accept incomplete strings)
	* example will return a list of records with last name starting with "test"
	```
	{
	  personByLName (lastName: "test") {
	    firstName
	    lastName
	    jobTitle
	    subordinates {
	      id
	      firstName
	      lastName
	      jobTitle
	    }
	    department {
	      id
	      name
	    }
	  }
	}
	```

* By Job Title
	* example will return a list of persons with job title "software engineer"
	```
	{
	  jobTitle (jobTitle: "software engineer") {
	    firstName
	    lastName
	    jobTitle
	    subordinates {
	      id
	      firstName
	      lastName
	      jobTitle
	    }
	    department {
	      id
	      name
	    }
	  }
	}
	```

#### Department Queries:

* All Departments in the organization
	* example will return all departments and details of all people within them (since the typedef of people returned is PersonType, it can be recursively used to get hierarchy and details of people within that hierarchy as well)
	```
	{
	  departments {
	    id
	    name
	    people {
	      id
	      firstName
	      lastName
	      jobTitle
	    }
	  }
	}
	```


* By ID 
	* example will return record with department name = "Sales", all the people within that department and their managers
	```
	{
	  department (id: "cfd90465-28fa-4b9a-be3e-ef2517e987e9") {
	    id
	    name
	    people {
	      id
	      firstName
	      lastName
	      jobTitle
	      manager {
	        firstName
	        lastName
	      }
	    }
	  }
	}
	```

 * By Name (case insensitive, will accept incomplete strings)
	  * example will return department with name Engineering
	```
	{
	  departmentByName(name: "engineering")  {
	    id
	    name
	  }
	}
	```

### Mutations
#### People Mutations
* Add Person
	* example will add a person with name "Test Add"
	```
	mutation {
	  addPerson(
	  	firstName: "Test"
	    lastName: "Add"
	    jobTitle: "Software Developer"
	    departmentId: "83bcecb8-70d7-47e3-8a9a-dd9f73332535"
	  	managerId: "a4c2423b-9537-4238-b108-d8504a1e2266"
	  )  {
	    id
	    firstName
	    lastNanme
	    jobTitle
	    manager {
	      firstName
	    }
	  	department {
	      name
	    }
	  }
	}
	```
* Edit Person
	* example will change the name of person "Test Add" to "Test Edit" and change the jobTitle from "Software Developer" to "Software Rockstar"
	```
	mutation {
	  editPerson(
	    id: "00523601-3794-40bc-b34b-ec2ca781bf22"
	  	firstName: "Test"
	    lastName: "Edit"
	    jobTitle: "Software Rockstar"
	    departmentId: "83bcecb8-70d7-47e3-8a9a-dd9f73332535"
	  	managerId: "a4c2423b-9537-4238-b108-d8504a1e2266"
	  )  {
	    id
	    firstName
	    lastName
	    jobTitle
	    manager {
	      firstName
	    }
	  	department {
	      name
	    }
	  }
	}
	```
* Delete Person
	* example will delete person named "test8 test8"
	```
	mutation {
	  deletePerson(
	    id: "0d98093f-aa7d-4d44-93f6-f45fb55ef585"
	  )  {
	    id
	    firstName
	    lastName
	    jobTitle
	  }
	}
	```

#### Department Mutations
* Add Department
	* example will add department named "Test Department"
	```
	mutation {
	 addDepartment(
	   name: "Test Department"
	 )  {
	   id
	   name
	 }
	}
	```
* Edit Department
	* example will edit department named "Software Engineering" to "Code Warrior"
	```
		mutation {
			  editDepartment(
			  id: "83bcecb8-70d7-47e3-8a9a-dd9f73332535"
			  name: "Code Warrior"
		  )  {
		    id
		    name
		  }
		}
	```
* Delete Department (TO DO)

  
## Built With

  

*  [GraphQL]() - API
*  [node.js]() - Backend
*  [Express]() - Server
*  [Mongoose]() - Used with MongoDB instance hosted on Atlas
*  [React]() - Frontend Framework
*  [Apollo]() - Used to bootstrap GraphQL querying with React
*  [Jest]() - For writing tests

  

## Author

  

*  **Kehkashan Fazal** - *Initial work*