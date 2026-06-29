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

const srcDir = path.resolve(__dirname, "src");
const componentsDir = path.resolve(srcDir, "components");
const designSystemDir = path.resolve(srcDir, "design-system");

const aliasEntries = [
	{ find: "@components", replacement: componentsDir },
	{ find: "@design-system", replacement: designSystemDir },
	{ find: "@", replacement: srcDir },
];

const peerExternals = new Set([
	"react",
	"react-dom",
	"react/jsx-runtime",
	"swr",
	"@toast-ui/react-editor",
	"@toast-ui/editor",
]);

function isPeerExternal(id) {
	if (peerExternals.has(id)) {
		return true;
	}
	if (id.startsWith("react/")) {
		return true;
	}
	if (id.startsWith("@toast-ui/")) {
		return true;
	}
	return false;
}

function isComponentsImport(id) {
	return (
		id.startsWith("@components") ||
		id.startsWith(componentsDir)
	);
}

function createJsConfig({ input, outputBase, externalComponents }) {
	return {
		input,
		output: [
			{
				file: `dist/${outputBase}.js`,
				format: "cjs",
				plugins: [terser()],
				paths: externalComponents
					? (id) => {
						if (isComponentsImport(id)) {
							return "pumpwood-ui-components/components";
						}
						return id;
					}
					: undefined,
			},
			{
				file: `dist/${outputBase}.esm.js`,
				format: "esm",
				plugins: [terser()],
				paths: externalComponents
					? (id) => {
						if (isComponentsImport(id)) {
							return "pumpwood-ui-components/components";
						}
						return id;
					}
					: undefined,
			},
		],
		plugins: [
			alias({ entries: aliasEntries }),
			resolve({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			}),
			commonjs(),
			image(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
				presets: [
					["@babel/preset-react", { runtime: "automatic" }],
					"@babel/preset-typescript",
				],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			}),
			postcss({
				extract: outputBase === "components" ? "index.css" : false,
				minimize: true,
			}),
		],
		external: (id) => {
			if (isPeerExternal(id)) {
				return true;
			}
			if (externalComponents && isComponentsImport(id)) {
				return true;
			}
			return false;
		},
	};
}

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

function createDtsConfig({ input, outputFile, externalComponents }) {
	return {
		input,
		output: [
			{
				file: outputFile,
				format: "esm",
				paths: externalComponents
					? (id) => {
						if (id.startsWith("@components")) {
							return "pumpwood-ui-components/components";
						}
						return id;
					}
					: undefined,
			},
		],
		plugins: [
			emitDeclarations(),
			dts(),
		],
		external: (id) => {
			if (id === "react" || id === "react-dom" || id === "react/jsx-runtime") {
				return true;
			}
			if (id === "pumpwood-ui-components/components") {
				return true;
			}
			if (externalComponents && id.startsWith("@components")) {
				return true;
			}
			if (/\.css$/.test(id)) {
				return true;
			}
			return false;
		},
	};
}

export default [
	createJsConfig({
		input: "src/components/index.ts",
		outputBase: "components",
		externalComponents: false,
	}),
	createJsConfig({
		input: "src/design-system/index.ts",
		outputBase: "design-system",
		externalComponents: true,
	}),
	createDtsConfig({
		input: "dist/types/components/index.d.ts",
		outputFile: "dist/components.d.ts",
		externalComponents: false,
	}),
	createDtsConfig({
		input: "dist/types/design-system/index.d.ts",
		outputFile: "dist/design-system.d.ts",
		externalComponents: true,
	}),
];
