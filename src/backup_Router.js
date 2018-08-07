/*import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import NewPage from './components/NewPage';
import Nav from './components/Nav';


const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>

				<Scene key="auth">
					<Scene key="login" component={LoginForm} title="Skate App4All" initial />
				</Scene>

				<Scene key="main">

					<Scene
						onRight={() => Actions.skateSpotCreate()}
						rightTitle="Add"
						key="employeeList"
						component={EmployeeList}
						title="Skate Spots"
						initial
					/>

					<Scene
						onLeft={() => { firebase.auth().signOut(); Actions.pop(); }}
						leftTitle="Log Out"
						key="employeeList"
						component={EmployeeList}
					/>

					<Scene key="navigation" component={Nav} title="Navigation" />
					<Scene key="newPage" component={NewPage} title="its a new page" />

					<Scene key="skateSpotCreate" component={EmployeeCreate} title="Create Skate Spot" />
					<Scene key="employeeEdit" component={EmployeeEdit} title="Edit Skate Spot" />
				</Scene>

			</Scene>
		</Router>
	);
};



export default RouterComponent;*/
