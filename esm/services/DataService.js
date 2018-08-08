class DataService {
  constructor(subscribeToUpdatedDataInteractor, subscribeToRequestedDataInteractor) {
    this.subscribeToUpdatedDataInteractor = subscribeToUpdatedDataInteractor;
    this.subscribeToRequestedDataInteractor = subscribeToRequestedDataInteractor;
  }

  async subscribeToUpdated() {
    await this.subscribeToUpdatedDataInteractor.execute();
  }

  async subscribeToRequested() {
    await this.subscribeToRequestedDataInteractor.execute();
  }
}

export default DataService;
