import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import image from "@rollup/plugin-image";
import alias from "@rollup/plugin-alias";
import dts from "rollup-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Plugin that runs `tsc --emitDeclarationOnly` before the dts bundling pass
 * so that raw per-file .d.ts files exist in dist/types for rollup-plugin-dts
 * to consume.
 *
 * This is necessary because Babel (used for JS compilation) strips types and
 * never produces .d.ts output on its own.
 */
function emitDeclarations() {
  return {
    name: "emit-declarations",
    buildStart() {
      execSync("npx tsc --emitDeclarationOnly --skipLibCheck", {
        cwd: __dirname,
        stdio: "inherit",
      });
    },
  };
}

/** Pass 1: compile JS bundles (CJS + ESM) via Babel */
const jsConfig = {
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
    alias({
      entries: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ],
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    image(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    postcss({
      extract: "index.css",
      minimize: true,
    }),
  ],
  external: ["react", "react-dom"],
};

/**
 * Pass 2: bundle per-file .d.ts files (emitted by tsc) into a single
 * dist/index.d.ts that consumers (and package.json "types" field) expect.
 */
const dtsConfig = {
  input: "dist/types/index.d.ts",
  output: [
    {
      file: "dist/index.d.ts",
      format: "esm",
    },
  ],
  plugins: [
    emitDeclarations(),
    dts(),
  ],
  external: ["react", "react-dom", "react/jsx-runtime", /\.css$/],
};

export default [jsConfig, dtsConfig];