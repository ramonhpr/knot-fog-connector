import _ from 'lodash';

class UpdateChanges {
  constructor(deviceStore, cloudConnector) {
    this.cloudConnector = cloudConnector;
    this.deviceStore = deviceStore;
  }

  async execute(device) {
    await this.updateDevicesChanges(device);
  }

  async difference(object, base) {
    function changes(_object, _base) {
      return _.transform(_object, (result, value, key) => {
        if (!_.isEqual(value, _base[key])) {
          result[key] = (_.isObject(value) && _.isObject(_base[key])) ? changes(value, _base[key]) : value; // eslint-disable-line no-param-reassign, max-len
        }
      });
    }
    return changes(object, base);
  }

  async updateDevicesChanges(device) {
    const localDevices = await this.deviceStore.list();
    if (device) {
      const localDevice = _.find(localDevices, _localDevice => _localDevice.id === device.id);
      const diff = await this.difference(device, localDevice);

      if (!_.isEmpty(diff)) {
        if (device.schema) {
          if (device.schema.length > 0) {
            try {
              this.cloudConnector.updateSchema(device.id, device.schema);
            } catch (err) {
              console.error(err);
            }
          }
        }
        try {
          this.cloudConnector.updateProperties(_.omit(diff, ['schema']));
          this.deviceStore.update(device.id, diff);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default UpdateChanges;
