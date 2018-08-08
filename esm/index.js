/* eslint-disable no-console */
// Infrastructure
import Settings from 'data/Settings';
import ConnectorFactory from 'infrastructure/ConnectorFactory';
import FogConnection from 'infrastructure/FogConnection';
import DeviceStore from 'infrastructure/DeviceStore';

// Domain
import UpdateDevices from 'interactors/UpdateDevices';
import SubscribeToUpdatedData from 'interactors/SubscribeToUpdatedData';
import SubscribeToRequestedData from 'interactors/SubscribeToRequestedData';
import DevicesService from 'services/DevicesService';
import DataService from 'services/DataService';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();
  const cloudType = await settings.getCloudType();

  try {
    const cloudConnector = ConnectorFactory.getConnector(cloudType, cloudSettings);
    const fogConnection = new FogConnection(fogAddress, fogCredentials);

    const deviceStore = new DeviceStore([]);

    const updateDevices = new UpdateDevices(deviceStore, fogConnection, cloudConnector);
    const subscribeToUpdatedData = new SubscribeToUpdatedData(fogConnection, cloudConnector);
    const subscribeToRequestedData = new SubscribeToRequestedData(fogConnection, cloudConnector);

    const devicesService = new DevicesService(updateDevices);
    const dataService = new DataService(subscribeToUpdatedData, subscribeToRequestedData);

    await cloudConnector.start();
    await fogConnection.start();

    await dataService.subscribeToUpdated();
    await dataService.subscribeToRequested();

    setInterval(devicesService.update.bind(devicesService), 3000);
  } catch (err) {
    console.error(err);
  }
}

main();
