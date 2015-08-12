exports.getComponent = function(path, isCacheActive) {
  if (isCacheActive) {
    return require(path);
  } else {
    delete require.cache[require.resolve(path)];
    return require(path);
  }
}