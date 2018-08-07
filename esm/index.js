/* eslint-disable no-console */
// Infrastructure
import Settings from 'data/Settings';
<<<<<<< 4ff738ddb4a611d8a59d25ac043cc5e7e99649f9
import ConnectorFactory from 'infrastructure/ConnectorFactory';
import FogConnection from 'infrastructure/FogConnection';
import DeviceStore from 'infrastructure/DeviceStore';

// Domain
import UpdateDevices from 'interactors/UpdateDevices';
import SubscribeToUpdatedData from 'interactors/SubscribeToUpdatedData';
import SubscribeToRequestedData from 'interactors/SubscribeToRequestedData';
import DevicesService from 'services/DevicesService';
import DataService from 'services/DataService';
=======
import ConnectorFactory from 'network/ConnectorFactory';
>>>>>>> Add ConnectorFactory to select the connector

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();
  const cloudType = await settings.getCloudType();

  try {
<<<<<<< 4ff738ddb4a611d8a59d25ac043cc5e7e99649f9
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
=======
    const connector = ConnectorFactory.create(cloudType, cloudSettings);
>>>>>>> Add ConnectorFactory to select the connector
  } catch (err) {
    console.error(err);
  }
}

main();
