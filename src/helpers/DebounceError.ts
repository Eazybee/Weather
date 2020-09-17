class DebounceError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    const trueProto = new.target.prototype;
    this.name = 'DEBOUNCED_REQUEST_ERROR';
    Object.setPrototypeOf(this, trueProto);
  }
}

export default DebounceError;
