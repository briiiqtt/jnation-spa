class LoginFailedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'LoginFailedError';
  }
}

module.exports = LoginFailedError;
