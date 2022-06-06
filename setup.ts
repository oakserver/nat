// Copyright 2022 the oak authors. All rights reserved. MIT License.

import originalImportMap from "./import-map.json" assert { type: "json" };

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.lstat(path);
  } catch {
    return false;
  }
  return true;
}

const VERSION = "0.0.1";

const importMapJson = {
  imports: {
    nat: `https://deno.land/x/nat@${VERSION}/mod.ts`,
    ...originalImportMap.imports,
  },
};

const denoJsonc = {
  importMap: "./import-map.json",
  tasks: {
    start: "deno run --check --allow-net --allow-hrtime main.tsx",
  },
};

const mainTsx = `/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, init, h, render, tw } from "nat";

function App() {
  return <h1 class={tw\`text-4xl\`}>Hello from nat!</h1>;
}

const router = init();

// add routes here, like:
router.get("/", render(<App />));

router.listen();
`;

console.log(
  `%cnat %cv${VERSION} %c- setup`,
  "color:cyan",
  "color:yellow",
  "color:none",
);

// check permissions and existing files
try {
  await Deno.permissions.request({ name: "read", path: "." });
  await Deno.permissions.request({ name: "write", path: "." });
} catch {
  console.log(
    "ERROR: setup requires read and write permissions to the current directory",
  );
}
if (await exists("./deno.json")) {
  console.log(
    "%cERROR%c: an existing deno.json exists in the current directory.",
    "color:red",
    "color:none",
  );
  Deno.exit(1);
}
if (await exists("./deno.jsonc")) {
  console.log(
    "%cERROR%c: an existing deno.jsonc exists in the current directory.",
    "color:red",
    "color:none",
  );
  Deno.exit(1);
}
if (await exists("./import-map.json")) {
  console.log(
    "%cERROR%c: an existing import-map.json exists in the current directory.",
    "color:red",
    "color:none",
  );
  Deno.exit(1);
}
if (await exists("./main.tsx")) {
  console.log(
    "%cERROR%c: an existing main.tsx exists in the current directory.",
    "color:red",
    "color:none",
  );
  Deno.exit(1);
}

console.log(
  `Setup will write out "deno.jsonc", "import-map.json", and "main.tsx".`,
);
if (!globalThis.confirm("Continue?")) {
  console.log(
    "%cExiting%c without writing files.",
    "color:yellow",
    "color:none",
  );
  Deno.exit(0);
}

console.log(
  "%cWriting %cdeno.jsonc%c...",
  "color:green",
  "color:yellow",
  "color:none",
);
await Deno.writeTextFile(
  "./deno.jsonc",
  JSON.stringify(denoJsonc, undefined, "  "),
);
console.log(
  "%cWriting %cimport-map.json%c...",
  "color:green",
  "color:yellow",
  "color:none",
);
await Deno.writeTextFile(
  "./import-map.json",
  JSON.stringify(importMapJson, undefined, "  "),
);
console.log(
  "%cWriting %cmain.tsx%c...",
  "color:green",
  "color:yellow",
  "color:none",
);
await Deno.writeTextFile("./main.tsx", mainTsx);

console.log("%cFinished.", "color:green");

console.log(
  `\nTo get started, edit "main.tsx" and run "deno task start" to run locally.`,
);
