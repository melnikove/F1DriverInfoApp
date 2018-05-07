import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton} from 'material-ui';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import axios from 'axios';

function loadDriversList(page)
{
  const url="http://ergast.com/api/f1/drivers.json?offset="+(page-1)*30;
  axios.get(url)
    .then(responce=>console.log(responce.data.MRData.DriverTable.Drivers));
 }

class DriversList extends Component
{
	
  constructor(props)
  {
    super(props);
    this.state={pageNumber:1};
    this.props.onUpdateDriversList(1);
  }

  handlePageNumberChange(event)
  {
    this.setState({pageNumber:event.target.value});
    this.props.onUpdateDriversList(event.target.value);
  }

  render()
	{
    let pageArr=[];
    for (let i=1; i<=29; i++)
        {
          pageArr[i]=i;
        }

		return (<div className="driversList">
              <h1>Drivers List:</h1>
			        <table className="tblDriversList">
    				      <tr className="tblDriversListHeader">
       					      <th>ID</th>
        				      <th>Name</th>
        				      <th>Information</th>
                      <th>Race Results</th>
    				      </tr>
      			      {this.props.driversList.map((item,index)=>{// для каждого гонщика отображаем строку таблицы
                    return (<tr className="tblDriversListRow">
                              <td>{item.driverId}</td>
                              <td>{item.givenName+" "+item.familyName}</td>
                              <td><Link to={"/driverInfo/"+item.driverId}>Link</Link></td>
                              <td><Link to={"/RaceResults/"+item.driverId}>Link</Link></td>
                            </tr>)
                  })}
              </table>
              <div class="blockSelect">
                  <label for="pageSelect">Выберите страницу:</label> 
                  <select value={this.state.pageNumber} id="pageSelect"
                                                        onChange={this.handlePageNumberChange.bind(this)}>
                          {pageArr.map((item,index)=>{return (<option key={index} value={item}>{item}</option>)})}
                  </select>
              </div>
          </div>);
	}
}

export default connect(
  state=>({
    driversList:state.driversList
  }),
  dispatch=>({
    onUpdateDriversList:(page)=>{
      const url=(page>1) ? "http://ergast.com/api/f1/drivers.json?offset="+(page-1)*30  :
                           "http://ergast.com/api/f1/drivers.json";
      axios.get(url)
        .then(responce=>{
                            dispatch({type:"UPDATE_DRIVERS_LIST", payload:responce.data.MRData.DriverTable.Drivers.slice()});
                          })
        .catch(error=>{  
                         console.log('Getting data error:');
                         console.log(error);
                       });


    }
  })
)(DriversList);

