class MenuAddFailedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'MenuAddFailedError';
  }
}

module.exports = MenuAddFailedError;
