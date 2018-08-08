class SubscribeToUpdatedData {
  constructor(fogConnection, cloudConnector) {
    this.fogConnection = fogConnection;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.cloudConnector.onDataUpdated(async (id, sensorId, data) => {
      await this.fogConnection.setData(id, sensorId, data);
    });
  }
}

export default SubscribeToUpdatedData;
