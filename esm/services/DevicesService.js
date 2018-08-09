import ObserverDevice from 'interactors/ObserverDevice';

class DevicesService {
  constructor(updateDevicesInteractor) {
    this.updateDevicesInteractor = updateDevicesInteractor;
  }

  async update() {
    await this.updateDevicesInteractor.execute();
    var observer = new ObserverDevice(this.updateDevicesInteractor);
    observer.observeDevicesChanges();
  }
}

export default DevicesService;
