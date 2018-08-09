class DevicesService {
  constructor(updateDevicesInteractor, loadDevicesInteractor, updateSchemaInteractor) {
    this.updateDevicesInteractor = updateDevicesInteractor;
    this.loadDevicesInteractor = loadDevicesInteractor;
    this.updateSchemaInteractor = updateSchemaInteractor;
  }

  async update() {
    await this.updateDevicesInteractor.execute();
  }

  async load() {
    await this.loadDevicesInteractor.execute();
  }

  async updateSchema() {
    await this.updateSchemaInteractor.execute();
  }
}

export default DevicesService;
