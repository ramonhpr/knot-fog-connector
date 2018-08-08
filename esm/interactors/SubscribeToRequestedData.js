class SubscribeToRequestedData {
  constructor(fogConnection, cloudConnector) {
    this.fogConnection = fogConnection;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.cloudConnector.onDataRequested(async (id, sensorId) => {
      await this.fogConnection.getData(id, sensorId);
    });
  }
}

export default SubscribeToRequestedData;
