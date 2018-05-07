import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
 
import driversList from './driversList';
import raceResults from './raceResults';
import driverInfo from './driverInfo';

export default combineReducers({
	routing: routerReducer,
	driversList,
	raceResults,
	driverInfo
});