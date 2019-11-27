class AuthenticateDevice {
  constructor(cloud, queue) {
    this.cloud = cloud;
    this.queue = queue;
  }

  async execute(id, token) {
    let error;

    try {
      const status = await this.cloud.authDevice(id, token);
      error = status ? null : 'Unauthorized';
    } catch (err) {
      error = err.message;
    }

    return this.queue.sendAuthenticatedDevice({ id, error });
  }
}

export default AuthenticateDevice;
