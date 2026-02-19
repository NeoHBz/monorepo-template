import globals from "globals";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    ignores: ["**/node_modules/**", "**/build/**", "**/dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      boundaries: boundaries,
    },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "apps/*" },
        { type: "package", pattern: "packages/*" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["apps"],
              allow: ["apps", "package"],
            },
            {
              from: ["packages"],
              allow: ["packages"],
            },
          ],
        },
      ],
    },
  },
];
