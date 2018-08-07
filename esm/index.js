import Settings from 'data/Settings';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();
  const cloudType = await settings.getCloudType();

  try {
    const connector = ConnectorFactory.getConnector(cloudType, cloudSettings);
    console.log(connector.settings);
  } catch (err) {
    console.error(err);
  }
}

main();
