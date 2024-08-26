const plugin = require("tailwindcss/plugin");

const updateVariant = plugin(function ({ addVariant }) {
  addVariant("group-update", ":merge(.group).update &");
});

module.exports = updateVariant;
