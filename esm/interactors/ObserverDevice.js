class ObserverDevice {
  constructor(updateDevices) {
    this.updateDevices = updateDevices;
    this.deviceMap = {};
  }
  async observeDevicesChanges() {
    let devices = [];

    devices = await this.updateDevices.deviceStore.list() //.then(array => devices=array);

    devices.forEach(async (device) => {
      console.log(`subscribe on device ${device.id}`);
      if (!this.deviceMap[device.id]) {
        console.log('ramon')
        console.log(this.deviceMap);
        this.deviceMap[device.id] = true;
        await this.updateDevices.fogConnection.on('config', async (device) => {
          console.log('--config--');
          console.log(device);
          if (Object.prototype.hasOwnProperty.call(device, 'schema')) {
            await this.updateDevices.cloudConnector.updateSchema(device.id, device.schema);
          }
        });
      } else {
        this.deviceMap[device.id] = false;
      }
    });
  }
}

export default ObserverDevice;
