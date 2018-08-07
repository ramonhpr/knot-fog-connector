import Settings from 'data/Settings';
import CloudEnum from 'data/CloudEnum';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();

  switch (cloudSettings.id) { // id?
    case CloudEnum.CLOUD_MESHBLU:
      console.log('Cloud Meshblu');
      break;
    case CloudEnum.CLOUD_FIWARE:
      console.log('Cloud Fiware');
      break;
    case CloudEnum.CLOUD_MESHBLU2:
      console.log('Cloud Meshblu v2');
      break;
    default:
      console.log('Unknown cloud');
  }
  console.log(`uuid: ${fogCredentials.uuid} token: ${fogCredentials.token}`);
  console.log(`host: ${fogAddress.host} port: ${fogAddress.port}`);
  console.log(`cloud: ${cloudSettings}`);
}

main();
