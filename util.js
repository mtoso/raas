exports.getComponent = function(path, deleteModuleCache) {
  if (deleteModuleCache) {
    delete require.cache[require.resolve(path)];
  }

  return require(path);
}