class UpdateSchema {
  constructor(fogConnector, cloudConnector) {
    this.fogConnector = fogConnector;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.updateDevicesSchema();
  }

  async updateDevicesSchema() {
    console.log('entrou');
    const fogDevices = await this.fogConnector.getMyDevices();
    await this.fogConnector.on('config', async (device) => {
      if (device.schema) {
        if (device.schema.length > 0) {
          await this.cloudConnector.updateSchema(device.id, device.schema);
        }
      }
    });
  }
}

export default UpdateSchema;
