class DataService {
  constructor(subscribeToUpdatedDataInteractor) {
    this.subscribeToUpdatedDataInteractor = subscribeToUpdatedDataInteractor;
  }

  async subscribeToUpdated() {
    await this.subscribeToUpdatedDataInteractor.execute();
  }
}

export default DataService;
