import logger from 'util/logger';

class RegisterDevice {
  constructor(deviceStore, cloudConnector, queue) {
    this.deviceStore = deviceStore;
    this.cloudConnector = cloudConnector;
    this.queue = queue;
  }

  async execute({ id, name }) {
    logger.debug(`Device ${id} added`);
    const deviceToBeSaved = {
      id,
      name,
    };
    let msgResponse;

    try {
      msgResponse = await this.cloudConnector.addDevice(deviceToBeSaved);
      msgResponse.error = null;
      await this.deviceStore.add(deviceToBeSaved);
    } catch (error) {
      logger.error(error.message);
      msgResponse = { id, token: '', error: error.message };
    }

    await this.queue.sendRegisteredDevice(msgResponse);
  }
}

export default RegisterDevice;
