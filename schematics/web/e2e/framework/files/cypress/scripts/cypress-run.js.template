const cypress = require("cypress");
const fse = require("fs-extra");
const { merge } = require("mochawesome-merge");
const generator = require("mochawesome-report-generator");

(async () => {
  await fse.remove("cypress/reports");
  await cypress.run({
    configFile: "cypress/cypress.json",
    browser: "chrome",
  });
  const jsonReport = await merge({
    files: ["cypress/reports/mochawesome/single-specs/*.json"],
  });
  await generator.create(jsonReport, {
    reportDir: "cypress/reports/mochawesome/final-report",
    cdn: true,
  });
})();
