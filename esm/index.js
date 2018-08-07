import Settings from 'data/Settings';
import ConnectorFactory from 'infrastructure/ConnectorFactory';
import FogConnection from 'infrastructure/FogConnection';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();
  const cloudType = await settings.getCloudType();

  try {
    const connector = ConnectorFactory.getConnector(cloudType, cloudSettings);
    const fogConn = new FogConnection(fogAddress, fogCredentials);
    console.log(connector.settings);
    await fogConn.start();
  } catch (err) {
    console.error(err);
  }
}

main();
