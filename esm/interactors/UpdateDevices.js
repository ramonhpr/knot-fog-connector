/* eslint-disable no-await-in-loop */
class UpdateDevices {
  constructor(deviceStore, fogConnection, cloudConnector) {
    this.deviceStore = deviceStore;
    this.fogConnection = fogConnection;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.updateDevicesAdded();
    await this.updateDevicesRemoved();
  }

  async updateDevicesAdded() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnection.devices();

    fogDevices.filter(fogDevice => !cloudDevices
      .some(cloudDevice => fogDevice.uuid === cloudDevice.uuid))
      .map(async (device) => {
        await this.deviceStore.add(device);
        await this.cloudConnector.addDevice({
          id: device.id,
          name: device.name,
        });
      });
  }

  async updateDevicesRemoved() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnection.devices();

    cloudDevices.filter(cloudDevice => !fogDevices
      .some(fogDevice => cloudDevice.uuid === fogDevice.uuid))
      .map(async (device) => {
        await this.deviceStore.remove(device);
        await this.cloudConnector.removeDevice(device.id);
      });
  }
}

export default UpdateDevices;
