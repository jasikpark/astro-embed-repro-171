// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig & {astroAllowShorthand?: boolean; experimentalTernaries: true}} */
export default {
  printWidth: 100,
  astroAllowShorthand: false,
  proseWrap: "never",
  trailingComma: "es5",
  plugins: ["prettier-plugin-astro", "@ianvs/prettier-plugin-sort-imports", "prettier-plugin-toml"],
  importOrder: [
    "^(.*)MainHead/MainHead.astro",
    "^@layouts/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^(#assets/)(.*)$",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderTypeScriptVersion: "5.1.6",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  experimentalTernaries: true,
};
