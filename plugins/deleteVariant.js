const plugin = require("tailwindcss/plugin");

const deleteVariant = plugin(function ({ addVariant }) {
  addVariant("crud-delete", ":merge(.crud).delete &");
});

module.exports = deleteVariant;
