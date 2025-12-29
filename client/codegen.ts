import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: import.meta.env.VITE_GRAPHQL_URL,
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
