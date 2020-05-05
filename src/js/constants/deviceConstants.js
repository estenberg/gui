module.exports = {
  SELECT_GROUP: 'SELECT_GROUP',
  SELECT_DEVICE: 'SELECT_DEVICE',
  SELECT_DEVICES: 'SELECT_DEVICES',

  ADD_TO_GROUP: 'ADD_TO_GROUP',
  ADD_STATIC_GROUP: 'ADD_STATIC_GROUP',
  REMOVE_STATIC_GROUP: 'REMOVE_STATIC_GROUP',
  ADD_DYNAMIC_GROUP: 'ADD_DYNAMIC_GROUP',
  REMOVE_FROM_GROUP: 'REMOVE_FROM_GROUP',
  REMOVE_DYNAMIC_GROUP: 'REMOVE_DYNAMIC_GROUP',
  RECEIVE_GROUPS: 'RECEIVE_GROUPS',
  RECEIVE_DYNAMIC_GROUPS: 'RECEIVE_DYNAMIC_GROUPS',
  RECEIVE_ALL_DEVICE_IDS: 'RECEIVE_ALL_DEVICE_IDS',
  RECEIVE_DEVICE: 'RECEIVE_DEVICE',
  RECEIVE_DEVICES: 'RECEIVE_DEVICES',
  RECEIVE_DEVICE_AUTH: 'RECEIVE_DEVICE_AUTH',
  ADD_DEVICE_AUTHSET: 'ADD_DEVICE_AUTHSET',
  UPDATE_DEVICE_AUTHSET: 'UPDATE_DEVICE_AUTHSET',
  REMOVE_DEVICE_AUTHSET: 'REMOVE_DEVICE_AUTHSET',
  DECOMMISION_DEVICE: 'DECOMMISION_DEVICE',
  RECEIVE_GROUP_DEVICES: 'RECEIVE_GROUP_DEVICES',
  SET_TOTAL_DEVICES: 'SET_TOTAL_DEVICES',
  SET_ACCEPTED_DEVICES_COUNT: 'SET_ACCEPTED_DEVICES_COUNT',
  SET_PENDING_DEVICES_COUNT: 'SET_PENDING_DEVICES_COUNT',
  SET_REJECTED_DEVICES_COUNT: 'SET_REJECTED_DEVICES_COUNT',
  SET_PREAUTHORIZED_DEVICES_COUNT: 'SET_PREAUTHORIZED_DEVICES_COUNT',
  SET_FILTER_ATTRIBUTES: 'SET_FILTER_ATTRIBUTES',
  SET_DEVICE_FILTERS: 'SET_DEVICE_FILTERS',

  SET_ACCEPTED_DEVICES: 'SET_ACCEPTED_DEVICES',
  SET_PENDING_DEVICES: 'SET_PENDING_DEVICES',
  SET_REJECTED_DEVICES: 'SET_REJECTED_DEVICES',
  SET_PREAUTHORIZED_DEVICES: 'SET_PREAUTHORIZED_DEVICES',

  SET_INACTIVE_DEVICES: 'SET_INACTIVE_DEVICES',

  SET_DEVICE_LIMIT: 'SET_DEVICE_LIMIT',

  DEVICE_LIST_MAXIMUM_LENGTH: 50,
  DEVICE_FILTERING_OPTIONS: {
    $eq: { title: 'equals', shortform: '=' },
    $ne: { title: 'not equal', shortform: '!=' },
    $gt: { title: '>', shortform: '>' },
    $gte: { title: '>=', shortform: '>=' },
    $lt: { title: '<', shortform: '<' },
    $lte: { title: '<=', shortform: '<=' },
    $in: { title: 'in', shortform: 'in' },
    $nin: { title: 'not in', shortform: 'not in' },
    $exists: { title: 'exists', shortform: 'exists' }
  },
  DEVICE_STATES: {
    accepted: 'accepted',
    pending: 'pending',
    preauth: 'preauthorized',
    rejected: 'rejected'
  }
};