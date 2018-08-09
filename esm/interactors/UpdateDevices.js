/* eslint-disable no-await-in-loop */
import ObserverDevice from 'interactors/ObserverDevice';

class UpdateDevices {
  constructor(deviceStore, fogConnection, cloudConnector) {
    this.deviceStore = deviceStore;
    this.fogConnection = fogConnection;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    Promise.all([this.updateDevicesAdded(), this.updateDevicesRemoved()])
    .then((values) => {
      /*var observer = new ObserverDevice(this);
      observer.observeDevicesChanges();*/
    });
  }

  async updateDevicesAdded() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnection.getMyDevices();

    fogDevices.filter(fogDevice => !cloudDevices
      .some(cloudDevice => fogDevice.id === cloudDevice.id))
      .map(async (device) => {
        console.log(device);
        await this.deviceStore.add(device);
        await this.fogConnection.subscribe(device.id, 'broadcast');
        await this.cloudConnector.addDevice({
          id: device.id,
          name: device.name,
        });
      });
  }

  async updateDevicesRemoved() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnection.getMyDevices();

    cloudDevices.filter(cloudDevice => !fogDevices
      .some(fogDevice => cloudDevice.id === fogDevice.id))
      .map(async (device) => {
        await this.deviceStore.remove(device);
        await this.cloudConnector.removeDevice(device.id);
      });
  }
}

export default UpdateDevices;
