import _ from 'lodash';

class UpdateDevices {
  constructor(deviceStore, fogConnector, cloudConnector) {
    this.deviceStore = deviceStore;
    this.fogConnector = fogConnector;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.updateDevicesAdded();
    await this.updateDevicesRemoved();
  }

  async updateDevicesAdded() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnector.getMyDevices();

    _.differenceBy(fogDevices, cloudDevices, 'id').map(async (device) => {
      await this.deviceStore.add(device);
      await this.cloudConnector.addDevice({
        id: device.id,
        name: device.name,
      });
    });
  }

  async updateDevicesRemoved() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnector.getMyDevices();

    _.differenceBy(cloudDevices, fogDevices, 'id').map(async (device) => {
      await this.deviceStore.remove(device);
      await this.cloudConnector.removeDevice(device.id);
    });
  }
}

export default UpdateDevices;
