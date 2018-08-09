class DevicesService {
  constructor(updateDevicesInteractor, loadDevicesInteractor, updateChangesInteractor) {
    this.updateDevicesInteractor = updateDevicesInteractor;
    this.loadDevicesInteractor = loadDevicesInteractor;
    this.updateChangesInteractor = updateChangesInteractor;
  }

  async update() {
    await this.updateDevicesInteractor.execute();
  }

  async load() {
    await this.loadDevicesInteractor.execute();
  }

  async listen() {
    await this.updateChangesInteractor.execute();
  }
}

export default DevicesService;
