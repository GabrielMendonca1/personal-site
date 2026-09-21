import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: [".next*/**"] },
  ...nextCoreWebVitals,
];

export default eslintConfig;
