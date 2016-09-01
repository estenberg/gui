import React from 'react';
import ReactDOM from 'react-dom';
import Time from 'react-time';
import { Motion, spring } from 'react-motion';
import Collapse from 'react-collapse';
import ReactHeight from 'react-height';
var AppActions = require('../../actions/app-actions');
var SelectedDevices = require('./selecteddevices');

// material ui
var mui = require('material-ui');
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

var Authorized =  React.createClass({
  getInitialState: function() {
    return {
       sortCol: "name",
       sortDown: true,
       minHeight: 220,
       divHeight: 148
    }
  },
  componentDidMount: function() {
    var h = this.props.unauthorized.length * 50;
    h += 170;
    this.setState({minHeight: h});
  },
  _getMinHeight:function() {

  },
  _sortColumn: function(col) {
    var direction;
    if (this.state.sortCol !== col) {
      ReactDOM.findDOMNode(this.refs[this.state.sortCol]).className = "sortIcon material-icons";
      ReactDOM.findDOMNode(this.refs[col]).className = "sortIcon material-icons selected";
      this.setState({sortCol:col, sortDown: true});
      direction = true;
    } else {
      direction = !(this.state.sortDown);
      ReactDOM.findDOMNode(this.refs[this.state.sortCol]).className = "sortIcon material-icons selected " +direction;
      this.setState({sortDown: direction});
    }
    // sort table
    AppActions.sortTable("_unauthorized", col, direction);
  },
  _authorizeDevices: function(devices) {
    // array of device objects
    var callback = {
      success: function(data) {
        AppActions.setSnackbar("Device accepted");
        // wait until end of forEach?
        this.props.refresh();
      }.bind(this),
      error: function(err) {
        AppActions.setSnackbar("Error accepting device: " + err);
      }
    };
       
    devices.forEach( function(element, index) {
      AppActions.acceptDevice(element, callback);
    });
  },
   _blockDevices: function(devices) {
    // array of device objects
    devices.forEach( function(element, index) {
      AppActions.rejectDevice(element, function(err) {
        if (err) {
          AppActions.setSnackbar("Error: " + err.error);
        } else {
          AppActions.setSnackbar("The device has been rejected");
        }
      }.bind(this));
    });
  },
  _expandRow: function(rowNumber, columnId, event) {
    event.stopPropagation();
    // If action buttons column, no expand
    if (columnId === 5) {
      this.setState({expanded: null});
    } else {
      var newIndex = rowNumber;
      if (rowNumber == this.state.expanded) {
        newIndex = null;
      }
      this.setState({expanded: newIndex});
    }
  },
  _adjustCellHeight: function(height) {
    this.setState({divHeight: height+60});
  },
  render: function() {
    var styles = {
      sortIcon: {
        verticalAlign: 'middle',
        marginLeft: "10px",
        color: "#8c8c8d",
        cursor: "pointer",
      }
    }
    var devices = this.props.unauthorized.map(function(device, index) {
      var expanded = '';
      if ( this.state.expanded === index ) {
        expanded = <SelectedDevices accept={this._authorizeDevices} block={this._blockDevices} unauthorized={true} selected={[device]}  />
      }
      return (
        <TableRow style={{"backgroundColor": "#e9f4f3"}} className={expanded ? "expand" : null} hoverable={true} key={index}>
          <TableRowColumn style={expanded ? {height: this.state.divHeight} : null}>{device.id}</TableRowColumn>
          <TableRowColumn>{device.device_type}</TableRowColumn>
          <TableRowColumn>{device.status}</TableRowColumn>
          <TableRowColumn><Time value={device.request_time} format="YYYY-MM-DD HH:mm" /></TableRowColumn>
          <TableRowColumn className="expandButton">
            <IconButton onClick={this._authorizeDevices.bind(null, [device])} style={{"paddingLeft": "0"}}>
              <FontIcon className="material-icons green">check_circle</FontIcon>
            </IconButton>
            <IconButton onClick={this._blockDevices.bind(null, [device])}>
              <FontIcon className="material-icons red">cancel</FontIcon>
            </IconButton>
          </TableRowColumn>
          <TableRowColumn style={{width:"0", overflow:"visible"}}>
  
            <Collapse springConfig={{stiffness: 210, damping: 20}} onHeightReady={this._adjustCellHeight} className="expanded" isOpened={expanded ? true : false}>
              {expanded}
            </Collapse>

          </TableRowColumn>
        </TableRow>
      )
    }, this);
    return (
      <Collapse springConfig={{stiffness: 190, damping: 20}} style={{minHeight:this.state.minHeight}} isOpened={true} className="margin-top margin-bottom onboard authorize">
        <p>Devices pending authorization</p>
        <Table
          selectable={false}
          className="unauthorized"
          onCellClick={this._expandRow}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false} 
          >
            <TableRow>
              <TableHeaderColumn className="columnHeader" tooltip="Name">Name<FontIcon ref="name" style={styles.sortIcon} onClick={this._sortColumn.bind(null, "name")} className="sortIcon material-icons">sort</FontIcon></TableHeaderColumn>
              <TableHeaderColumn className="columnHeader" tooltip="Device type">Device type<FontIcon ref="device_type" style={styles.sortIcon} onClick={this._sortColumn.bind(null, "device_type")} className="sortIcon material-icons">sort</FontIcon></TableHeaderColumn>
              <TableHeaderColumn className="columnHeader" tooltip="Status">Status<FontIcon ref="status" style={styles.sortIcon} onClick={this._sortColumn.bind(null, "status")} className="sortIcon material-icons">sort</FontIcon></TableHeaderColumn>
              <TableHeaderColumn className="columnHeader" tooltip="Last connection request">Last connection request<FontIcon ref="request_time" style={styles.sortIcon} onClick={this._sortColumn.bind(null, "request_time")} className="sortIcon material-icons">sort</FontIcon></TableHeaderColumn>
              <TableHeaderColumn className="columnHeader" tooltip="Authorize device?">Authorize?</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            className="clickable">
            {devices}
          </TableBody>
        </Table>
        <RaisedButton onClick={this._authorizeDevices.bind(null, this.props.unauthorized)} className="bottom-right-button" primary={true} label="Authorize all" />
      </Collapse>
    );
  }
});


module.exports = Authorized;