import FiwareConnector from 'infrastructure/FiwareConnector';

class ConnectorFactory {
  static getConnector(type, settings) {
    switch (type) {
      case 'FIWARE':
        return new FiwareConnector(settings);
      default:
        throw Error('Unknown cloud');
    }
  }
}

export default ConnectorFactory;
