// Copyright 2022 the oak authors. All rights reserved. MIT License.

/** A server side rendering framework for Deno CLI and Deploy.
 *
 * Incorporating [acorn](https://deno.land/x/acorn/),
 * [nano-jsx](https://nanojsx.io/), and [twind](https://twind.dev/), it provides
 * the tooling to provide a server centric framework for providing dynamic
 * websites served from the edge.
 *
 * ### Example
 *
 * ```ts
 * import { Fragment, h, init, render, tw } from "../mod.ts";
 *
 * const router = init();
 *
 * const App = ({ name }: { name: string }) => (
 *   <>
 *     <div class={tw`text-xl`}>Hello {name}!</div>
 *   </>
 * );
 *
 * router.get("/", render(<App name="world" />));
 *
 * router.listen();
 * ```
 *
 * @module
 */

import "./jsx.d.ts";

export { h } from "nano-jsx/core";
export { Fragment } from "nano-jsx/fragment";
export { apply, tw } from "twind";
export { css } from "twind/css";

export { render } from "./handlers.ts";
export { init } from "./init.ts";
