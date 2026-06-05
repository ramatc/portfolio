module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/self-closing-comp": "warn",
    "@next/next/no-img-element": "off",
  },
};
