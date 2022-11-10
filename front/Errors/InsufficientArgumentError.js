class InsufficientArgumentError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'InsufficientArgumentError';
  }
}

module.exports = InsufficientArgumentError;
