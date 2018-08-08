import React from 'react';
import { Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import SkateSpotGPSCreate from './components/SkateSpotGPSCreate';
import NewSkateSpotGPSCreate from './components/NewSkateSpotGPSCreate';
import EmployeeEdit from './components/EmployeeEdit';
import SkateSpotList from './components/SkateSpotList';
import Nav from './components/Nav';
import ListShow from './components/ListShow';
import SkateSpotShow from './components/SkateSpotShow';
import NewSkateSpotCreate from './components/NewSkateSpotCreate';
import SkateSpotEdit from './components/SkateSpotEdit';
import MenuBG from './components/MenuBG';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>


				<Scene key="auth">
					<Scene key="login" component={LoginForm} title="Skate App4All" initial />
				</Scene>

				<Scene key="main">
					<Scene key="new_skateSpotGPSCreate" component={NewSkateSpotGPSCreate} title="New Create Skate Spot by GPS" />
					<Scene key="new_skateSpotShow" component={SkateSpotShow} title="Skate Spot Show" />
					<Scene key="newSkateSpotCreate" component={NewSkateSpotCreate} title="New Create Skate Spot" />
					<Scene key="skateSpotEdit" component={SkateSpotEdit} title="New Edit Skate Spot"/>
				</Scene>

				<Scene key="tabbar"	tabs={true}
					tabBarStyle={{backgroundColor:'#f4f3f5'}}
				>

					<Scene key="navigation" component={MenuBG} title="Menu" initial />
					<Scene key="skateSpotList" component={SkateSpotList} title="Skate Spot List" icon={TabIcon} />

					<Scene key="logout" component={LoginForm} title="Log out" icon={TabIcon} on={() => { firebase.auth().signOut();}}/>

				</Scene>

			</Scene>
		</Router>
	);
};

					/*
						<Scene key="skateSpotGPSCreate" component={SkateSpotGPSCreate} title="Create Skate Spot by GPS" />
						<Scene key="employeeEdit" component={EmployeeEdit} title="Edit Skate Spot" />
						<Scene key="skateSpotCreate" component={EmployeeCreate} title="Create Skate Spot" />
						<Scene key="fetchSkateSpotList" component={EmployeeList} title="Skate Spots" />
						<Scene key="skateSpotList" component={SkateSpotList} title="Skate Spot List" initial />
				    <Scene key="navigation" component={Nav} title="Navigation" icon={TabIcon} />
						<Scene key="skateSpotShow" component={ListShow} title="Skate Spot Show" />
						<Scene key="skateSpotEdit" component={SkateSpotEdit} onBack={() => Actions.main()} title="New Edit Skate Spot" leftTitle="Go"/>
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
					*/


export default RouterComponent;
