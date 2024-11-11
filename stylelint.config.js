/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-recommended"],
  plugins: ["stylelint-gamut"],
  rules: {
    "function-disallowed-list": ["rgba", "hsla", "rgb", "hsl"],
    "color-function-notation": "modern",
    "color-no-hex": true,
  },
  overrides: [
    {
      files: ["**/**.astro"],
      extends: ["stylelint-config-recommended", "stylelint-config-astro"],
      plugins: ["stylelint-gamut"],
      rules: {
        "function-disallowed-list": ["rgba", "hsla", "rgb", "hsl"],
        "color-function-notation": "modern",
        "color-no-hex": true,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            // the scss linter doesn't know about astro scoping
            ignorePseudoClasses: ["global"],
          },
        ],
      },
    },
  ],
};
