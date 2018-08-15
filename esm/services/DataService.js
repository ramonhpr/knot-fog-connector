class DataService {
  constructor(updateDataInteractor, publishDataInteractor) {
    this.updateDataInteractor = updateDataInteractor;
    this.publishDataInteractor = publishDataInteractor;
  }

  async update(id, sensorId, data) {
    await this.updateDataInteractor.execute(id, sensorId, data);
  }

  async publish(id, data) {
    await this.publishDataInteractor.execute(id, data);
  }
}

export default DataService;
