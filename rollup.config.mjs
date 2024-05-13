import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
// import css from "rollup-plugin-import-css";
import postcss from "rollup-plugin-postcss";
// import scss from "rollup-plugin-scss";

export default [
  {
    input: "src/index.js",
    external: ["react", "react-dom"],
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),
      resolve(),
      terser(),
      // css(),
      postcss({
        plugins: [],
        minimize: true,
        extract: "style.css",
      }),
      // scss(),
    ],
  },
];
