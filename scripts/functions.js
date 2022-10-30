function typeCheck(key, value, type) {
  if (typeof value === type) return true;
  else throw Error(`"${key}" must be a ${type}`);
}