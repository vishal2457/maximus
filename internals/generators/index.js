/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const path = require("path");
const { execSync } = require("child_process");
const mainGenerator = require("./components/index.js");
const { zodToJsonSchema } = require("zod-to-json-schema");
/**
 * Every generated backup file gets this extension
 * @type {string}
 */
const BACKUPFILE_EXTENSION = "rbgen";

module.exports = (plop) => {
  plop.setGenerator("component", mainGenerator);
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
  plop.setActionType("prettify", (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      "/../../app/",
      config.path,
      plop.getHelper("properCase")(answers.name),
      "**",
      "**.js"
    )}`;

    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
};

module.exports.BACKUPFILE_EXTENSION = BACKUPFILE_EXTENSION;
