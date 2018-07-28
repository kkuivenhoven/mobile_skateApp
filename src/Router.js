import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import SkateSpotGPSCreate from './components/SkateSpotGPSCreate';
import NewSkateSpotGPSCreate from './components/NewSkateSpotGPSCreate';
import EmployeeEdit from './components/EmployeeEdit';
import NewPage from './components/NewPage';
import Nav from './components/Nav';
import ListShow from './components/ListShow';


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
					/>

					<Scene
						onLeft={() => { firebase.auth().signOut(); Actions.pop(); }}
						leftTitle="Log Out"
						key="employeeList"
						component={EmployeeList}
					/>

					<Scene key="navigation" component={Nav} title="Navigation" initial />
					<Scene key="newPage" component={NewPage} title="its a new page" />

					<Scene key="fetchSkateSpotList" component={EmployeeList} title="Skate Spots" />

					<Scene key="skateSpotCreate" component={EmployeeCreate} title="Create Skate Spot" />
					<Scene key="skateSpotGPSCreate" component={SkateSpotGPSCreate} title="Create Skate Spot by GPS" />
					<Scene key="new_skateSpotGPSCreate" component={NewSkateSpotGPSCreate} title="New Create Skate Spot by GPS" />

					<Scene key="employeeEdit" component={EmployeeEdit} title="Edit Skate Spot" />
					<Scene key="skateSpotShow" component={ListShow} title="Skate Spot Show" />
				</Scene>

			</Scene>
		</Router>
	);
};



export default RouterComponent;
