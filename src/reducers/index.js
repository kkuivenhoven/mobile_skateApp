import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import SelectionReducer from './SelectionReducer';
import SkateSpotReducer from './SkateSpotReducer';
import SkateSpotFormReducer from './SkateSpotFormReducer';

export default combineReducers({
	auth: AuthReducer,
	employeeForm: EmployeeFormReducer,
	employees: EmployeeReducer,
	skateSpots: SkateSpotReducer,
	skateSpotsForm: SkateSpotFormReducer,
	selectedId: SelectionReducer,
});


