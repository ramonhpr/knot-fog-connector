import _ from 'lodash';

function mapDevice(device) { // remove unneeded properties
  return _.omit(device, ['uuid', '_id', 'owner', 'type', 'ipAddress', 'token', 'meshblu', 'discoverWhitelist', 'configureWhitelist']);
}


class UpdateChanges {
  constructor(deviceStore, fogConnector, cloudConnector) {
    this.fogConnector = fogConnector;
    this.cloudConnector = cloudConnector;
    this.deviceStore = deviceStore;
  }

  async execute() {
    await this.updateDevicesChanges();
  }

  async updateSchema(device) {
    if (device.schema) {
      if (device.schema.length > 0) {
        await this.cloudConnector.updateSchema(device.id, device.schema);
      }
    }
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

  async updateProperties(device) {
    const cloudDevices = await this.deviceStore.list();

    cloudDevices.forEach(async (cloudDevice) => {
      if (cloudDevice.id === device.id) {
        const diff = await this.difference(device, cloudDevice);
        console.log('diff');
        console.log(diff);
        if (!_.isEmpty(diff)) {
          await this.cloudConnector.updateProperties(diff);
        }
      }
    });
  }

  async updateDevicesChanges() {
    await this.fogConnector.on('config', async (device) => {
      console.log('--config--');
      const deviceMapped = mapDevice(device);
      console.log(deviceMapped);

      this.updateSchema(deviceMapped);
      this.updateProperties(deviceMapped);
    });
  }
}

export default UpdateChanges;
