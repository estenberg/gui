import React from 'react';
import Time from 'react-time';

// material ui
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { CancelOutlined as CancelOutlinedIcon } from '@material-ui/icons';

import Confirm from './confirm';
import ProgressChart from './progressChart';
import { formatTime, groupDeploymentStats } from '../../helpers';
import AppActions from '../../actions/app-actions';
import AppStore from '../../stores/app-store';

const deploymentTypeClasses = {
  past: 'past-item',
  pending: 'pending-item',
  progress: 'progress-item'
};

export default class DeploymentItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      stats: {
        downloading: 0,
        decommissioned: 0,
        failure: 0,
        installing: 0,
        noartifact: 0,
        pending: 0,
        rebooting: 0,
        success: 0,
        'already-installed': 0
      }
    };
  }

  // get statistics for each in progress
  componentDidMount() {
    this.timer = setInterval(() => this.refreshDeploymentDevices(), 30000);
    this.refreshDeploymentDevices();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  refreshDeploymentDevices() {
    const self = this;
    return AppActions.getSingleDeploymentStats(self.props.deployment.id).then(stats => self.setState({ stats }));
  }

  handleAbort(id) {
    this.props.abort(id);
  }
  toggleConfirm(id) {
    var self = this;
    setTimeout(() => {
      self.setState({ abort: self.state.abort ? null : id });
    }, 150);
  }

  render() {
    const self = this;
    const { deployment, openReport, index, type, columnHeaders } = self.props;
    const { abort, stats } = self.state;
    const { inprogress: current, successes, failures } = groupDeploymentStats(stats);

    const { artifact_name, name, created, device_count, id, status, phases } = deployment;

    let confirmation;
    if (abort === id) {
      confirmation = (
        <Confirm
          classes="flexbox centered confirmation-overlay"
          cancel={() => self.toggleConfirm(id)}
          action={() => self.handleAbort(id)}
          table={true}
          type="abort"
        />
      );
    }
    const isEnterprise = AppStore.getIsEnterprise() || AppStore.getIsHosted();
    const started = isEnterprise && phases && phases.length >= 1 ? phases[0].start_ts || created : created;
    return (
      <div className={`deployment-item ${deploymentTypeClasses[type]}`}>
        {!!confirmation && confirmation}
        <div className={columnHeaders[0].class}>{artifact_name}</div>
        <div className={columnHeaders[1].class}>{name}</div>
        <Time className={columnHeaders[2].class} value={formatTime(started)} format="YYYY-MM-DD HH:mm" />
        <div className={columnHeaders[3].class}>{device_count}</div>
        {type === 'progress' ? (
          <>
            <ProgressChart
              className={columnHeaders[4].class}
              currentSuccessCount={successes}
              currentProgressCount={current}
              totalDeviceCount={device_count}
              totalFailureCount={failures}
              phases={phases}
              created={created}
              id={id}
            />
            <Button className={columnHeaders[5].class} variant="contained" onClick={() => openReport(index, type)} style={{ justifySelf: 'center' }}>
              View details
            </Button>
          </>
        ) : (
          <>
            <div className={`flexbox space-between centered ${columnHeaders[4].class}`}>{status}</div>
            <div className={columnHeaders[5].class} />
          </>
        )}
        <Tooltip className={`columnHeader ${columnHeaders[6].class}`} title="Abort" placement="top-start">
          <IconButton onClick={() => self.toggleConfirm(id)}>
            <CancelOutlinedIcon className="cancelButton muted" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}
