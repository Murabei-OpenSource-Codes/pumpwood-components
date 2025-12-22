import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import image from "@rollup/plugin-image";


export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      plugins: [terser()],
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    image(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss(),
  ],
  external: ["react", "react-dom"],
};