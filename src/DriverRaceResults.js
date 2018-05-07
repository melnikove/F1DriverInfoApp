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

class DriverRaceResults extends Component//информация о результатах заездов гонщика
{
	constructor(props)
  {
    super(props);
    this.props.onUpdateRaceResults(this.props.match.params.driverId);//загружаем таблицу результатов 
  }

  render()
	{
    
		return (<div className="driverRaceResults">
              <h1>Race Results:</h1>
              <div className="raceResults">
                  {this.props.raceResults.map((item,index)=>
                    {
                        return (<div className="raceResult">
                                  <h3 className="hdrRace">{item.season+" "+item.raceName}</h3>
                                  <table className="tblRaceResult">
                                    <tr className="raceResultHeader">
                                      <th className="hdrPos">Pos</th>
                                      <th className="hdrNum">No</th>
                                      <th className="hdrName">Driver</th>
                                      <th className="hdrConstructor">Constructor</th>
                                      <th className="hdrLaps">Laps</th>
                                      <th className="hdrGrid">Grid</th>
                                      <th className="hdrTime">Time</th>
                                      <th className="hdrStatus">Status</th>
                                      <th className="hdrPoints">Points</th>
                                    </tr>
                                    {
                                      item.Results.map((itemResults, indexResults)=>//для каждого заезжа формируем строку таблицы
                                      {
                                         return (<tr key={indexResults} className="tblDriverRaceResultsRow">
                                                     <td className="pos">{(itemResults.positionText!==undefined) ? itemResults.positionText : ""}</td>
                                                     <td className="num">{(itemResults.number!==undefined) ? itemResults.number : ""}</td>
                                                     <td className="name">{((itemResults.Driver.givenName!==undefined)&&(itemResults.Driver.familyName!==null)) ? (itemResults.Driver.givenName+" "+itemResults.Driver.familyName) : ""}</td>
                                                     <td className="constructor">{(itemResults.Constructor!==undefined) ? itemResults.Constructor.name : ""}</td>
                                                     <td className="laps">{(itemResults.laps!==undefined) ? itemResults.laps : ""}</td>
                                                     <td className="grid">{(itemResults.grid!==undefined) ? itemResults.grid : ""}</td>
                                                     <td className="time">{(itemResults.Time!==undefined) ? itemResults.Time.time : ""}</td>
                                                     <td className="status">{(itemResults.status!==undefined) ? itemResults.status : ""}</td>
                                                     <td className="points">{(itemResults.Time!==undefined) ? itemResults.Time.points : "0"}</td>
                                                 </tr>)
                                      })
                                    }
                                  </table>
                                  <div className="splitTable">
                                  </div>
                                </div>)
                    }
                  )
                  }
              </div>
            </div>);
	}
}

export default connect(
  state=>({
    raceResults:state.raceResults
  }),
  dispatch=>({
    onUpdateRaceResults:(driverId)=>{
      const url="http://ergast.com/api/f1/drivers/"+driverId+"/results.json?limits=1000";
      axios.get(url)
        .then(responce=>{
                            dispatch({type:"UPDATE_RACE_RESULTS", payload:responce.data.MRData.RaceTable.Races.slice()});
                          })
        .catch(error=>{  
                         console.log('Getting data error:');
                         console.log(error);
                       });
    }
  })
)(DriverRaceResults);

