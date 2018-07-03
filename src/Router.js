import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';


const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>

				<Scene key="auth">
					<Scene key="login" component={LoginForm} title="Skate App Login/Sign up" initial />
				</Scene>


				<Scene key="main">
					<Scene
						onRight={() => Actions.employeeCreate()}
						rightTitle="Add"
						key="employeeList"
						component={EmployeeList}
						title="Skate Spots"
						initial
					/>

					<Scene
						onLeft={() => console.log("test")}
						leftTitle="Log Out"
						key="employeeList"
						component={EmployeeList}
						title="Skate Spots"
					/>

					<Scene key="employeeCreate" component={EmployeeCreate} title="Create Skate Spot" />
					<Scene key="employeeEdit" component={EmployeeEdit} title="Edit Skate Spot" />
				</Scene>

			</Scene>
		</Router>
	);
};



export default RouterComponent;
