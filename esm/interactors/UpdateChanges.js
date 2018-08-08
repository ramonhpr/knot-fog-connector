import _ from 'lodash';

class UpdateChanges {
  constructor(deviceStore, cloudConnector) {
    this.cloudConnector = cloudConnector;
    this.deviceStore = deviceStore;
  }

  async execute() {
    await this.updateDevicesChanges();
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
    const cloudDevices = await this.cloudConnector.listDevices();
    const cloudDevice = _.find(cloudDevices, async (cloudDevice) => {
      return cloudDevice.id === device.id;
    });

    const diff = await this.difference(device, cloudDevice);
    console.log('diff');
    console.log(diff);
    if (!_.isEmpty(diff)) {
      if (device.schema) {
        if (device.schema.length > 0) {
          await this.cloudConnector.updateSchema(device.id, device.schema);
        }
      }
      await this.cloudConnector.updateProperties(diff);
    }
  }
}

export default UpdateChanges;
