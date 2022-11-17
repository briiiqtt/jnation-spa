class InvalidArgumentError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'InvalidArgumentError';
  }
}

module.exports = InvalidArgumentError;
