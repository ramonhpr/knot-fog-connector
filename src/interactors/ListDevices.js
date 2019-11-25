import convertToSnakeCase from '../util/snakeCase';

class ListDevices {
  constructor(cloudConnector, queue) {
    this.cloudConnector = cloudConnector;
    this.queue = queue;
  }

  async execute() {
    try {
      const devices = await this.cloudConnector.listDevices();
      await this.queue.sendList({
        devices: devices.map((dev) => {
          const device = dev;
          device.schema = convertToSnakeCase(dev.schema);
          return device;
        }),
        error: null,
      });
    } catch (error) {
      await this.queue.sendList({ devices: [], error: error.message });
    }
  }
}

export default ListDevices;
