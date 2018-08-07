import Credentials from 'entities/Credentials';
import Address from 'entities/Address';
import config from 'config';

class FogSettings {
  async getFogCredentials() {
    return new Credentials(config.get('fog.uuid'), config.get('fog.token'));
  }

  async getFogAddress() {
    return new Address(config.get('fog.host'), config.get('fog.port'))
  }
}

export default FogSettings;
