import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

import { Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware} from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import DriversList from './DriversList';//Список гонщиков
import DriverInfo from './DriverInfo';//Информация о гонщике 
import DriverRaceResults from './DriverRaceResults';//Таблица результатов заездов

import reducer from './reducers';

import './style.less';

const history=createHistory();

const middleware=routerMiddleware(history);
 
const store=createStore(reducer,
                        composeWithDevTools(applyMiddleware(middleware)));


ReactDOM.render(<MuiThemeProvider>
					<Provider store={store}>
						<ConnectedRouter history={history}>
							<Switch>
								<Route exact path="/" component={DriversList} />
								<Route path="/driverInfo/:driverId" component={DriverInfo} />
								<Route path="/RaceResults/:driverId" component={DriverRaceResults} />
							</Switch>
	            		</ConnectedRouter>
	            	</Provider>
	            </MuiThemeProvider>, 
	            document.getElementById('root'));


module.hot.accept();

