// https://github.com/arackaf/customize-cra/blob/master/api.md.

const {
  useBabelRc,
  removeModuleScopePlugin,
  override,
} = require("customize-cra");
module.exports = override(useBabelRc(), removeModuleScopePlugin());
