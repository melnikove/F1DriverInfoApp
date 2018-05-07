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

class DriverInfo extends Component
{
  constructor(props)
  {
    super(props);
  }

  findIndexById(id)//находим индекс в массиве по Id гонщика 
  {
    let ind;
    this.props.driversList.map((item,index)=>{
      if (item.driverId===id) {ind=index}
    });

    return ind;
  }

	render()
	{
    const driverInfo=this.props.driversList[this.findIndexById(this.props.match.params.driverId)];

		return (<div className="driverInfo">
              <h1>Driver Info:</h1>
              <table className="tblDriverInfo">
			           <tr>
                    <td className="hdrDriverId">Driver Id</td>
                    <td className="driverId">{driverInfo.driverId}</td>
                 </tr>
                 <tr>
                    <td className="hdrName">Name</td>
                    <td className="name">{driverInfo.givenName+" "+driverInfo.familyName}</td>
                 </tr>
                 <tr>
                    <td className="hdrDateOfBirth">Date of birth</td>
                    <td className="dateOfBirth">{driverInfo.dateOfBirth}</td>
                 </tr>
                 <tr>
                    <td className="hdrNationality">Nationality</td>
                    <td className="nationality">{driverInfo.nationality}</td>
                 </tr>
                 <tr>
                    <td className="hdrInfo">Info</td>
                    <td className="info"><a href={driverInfo.url} target="_blank">Info</a></td>
                 </tr>
			        </table>
            </div>);
	}
}

export default connect(
  state=>({
    driversList:state.driversList
  }),
  dispatch=>({})
  )(DriverInfo);

