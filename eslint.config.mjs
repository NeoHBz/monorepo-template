import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import boundaries from "eslint-plugin-boundaries";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**",
      "**/.next/**",
      "packages/prisma/generated/**",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "import": importPlugin,
      "simple-import-sort": simpleImportSort,
      "boundaries": boundaries,
      "prettier": prettierPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./packages/tsconfig/base.json", "./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
        }
      },
      "boundaries/elements": [
        { type: "app", pattern: "apps/*" },
        { type: "package", pattern: "packages/*" },
      ]
    },
    rules: {
      "prettier/prettier": "error",
      
      // Enforce `import type` usage
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "separate-type-imports" }],
      "@typescript-eslint/no-import-type-side-effects": "error",
      
      // Disallow relative imports, but allow same-directory index resolution
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["../*"],
              "message": "Relative imports are not allowed. Please use '@/*' or '@apps/*' or '@packages/*' absolute imports."
            },
            {
              "group": ["./*"],
              "message": "Relative imports are not allowed. Please use '@/*' or '@apps/*' or '@packages/*' absolute imports."
            }
          ]
        }
      ],

      // Enforce correct sorting
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            // Node.js built-ins.
            ["^node:"],
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            ["^(@apps|@packages)(/.*|$)"],
            // Internal aliases.
            ["^@(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.s?css$"]
          ]
        }
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // Boundaries rules
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: ["app"], allow: ["app", "package"] },
            { from: ["package"], allow: ["package"] }
          ]
        }
      ]
    }
  }
);
