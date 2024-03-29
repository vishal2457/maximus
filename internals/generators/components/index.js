/**
 * Component Generator
 */

/* eslint strict: ["off"] */
const { readdirSync, readFileSync, lstatSync } = require("fs");
const path = require("path");
const { zodToJsonSchema } = require("zod-to-json-schema");
const basePrompts = require("../utils/base-prompts");

const basePath = path.join(__dirname, "../../../libs/tp-schema/src/lib");

module.exports = {
  description: "Add an unconnected component",
  prompts: [
    ...basePrompts,
    {
      type: "list",
      name: "generator",
      message: "What do you want to generate",
      choices: ["crud", "crud-with-file-upload", "crud-api-only"],
    },
  ],
  actions: (data) => {
    const files = readdirSync(basePath, { recursive: true });
    let schemaDefinition;
    for (const file of files) {
      if (lstatSync(`${basePath}/${file}`).isFile()) {
        const j = require("jiti")(__filename);
        const schema = j(`${basePath}/${file}`)[data.zodSchema];
        if (schema) {
          const jsonSchema = zodToJsonSchema(schema, data.zodSchema);
          schemaDefinition = jsonSchema.definitions[data.zodSchema].properties;
        }
      }
    }
    if (!schemaDefinition) {
      console.error(`No Schema with name ${data.zodSchema}`);
      return [];
    }

    const actions = [
      {
        type: "add",
        path: "../../apps/api/src/modules/{{name}}/models/{{name}}.model.ts",
        templateFile: "./components/backend/model.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/api/src/modules/{{name}}/{{name}}.api.ts",
        templateFile: "./components/backend/api.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}.module.ts",
        templateFile: "./components/frontend/module.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}-routing.module.ts",
        templateFile: "./components/frontend/routing.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/list/list.component.ts",
        templateFile: "./components/frontend/list.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}-form/form/form.component.html",
        templateFile: "./components/frontend/form/form.html.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}-form/form/form.component.ts",
        templateFile: "./components/frontend/form/form.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}-form/add-form.component.ts",
        templateFile: "./components/frontend/form/add-form.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
      {
        type: "add",
        path: "../../apps/admin/src/app/features/{{name}}/{{name}}-form/edit-form.component.ts",
        templateFile: "./components/frontend/form/edit-form.ts.hbs",
        skipIfExists: true,
        data: schemaDefinition,
      },
    ];

    return actions;
  },
};