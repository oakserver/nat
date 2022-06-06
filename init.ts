// Copyright 2022 the oak authors. All rights reserved. MIT License.

/** Contains initialization and setup functionality.
 *
 * @module
 */

import { Router } from "acorn";
import { type Configuration as TwindConfig, setup } from "twind";
import { type KeyRing } from "oak_commons/types";

import { sheet } from "./handlers.ts";

export interface StartOptions extends TwindConfig {
  /** A key ring which will be used for signing and validating cookies. */
  keys?: KeyRing;
  /** When providing internal responses, like on unhandled errors, prefer JSON
   * responses to HTML responses. When set to `false` HTML will be preferred
   * when responding, but content type negotiation will still be respected.
   *  Defaults to `true`. */
  preferJson?: boolean;
  /** When `true` skip setting up default logging on the router. */
  quiet?: boolean;
}

/** Initialize the environment optionally using the provided options, returning
 * an instance of {@linkcode Router}.
 *
 * ### Example
 *
 * ```ts
 * import { init, render } from "https://deno.land/x/nat/mod.ts";
 * import { App } from "./App.tsx";
 *
 * const router = init();
 * router.get("/", render(<App />));
 *
 * router.listen();
 * ```
 */
export function init(options: StartOptions = {}): Router {
  options.sheet = sheet;
  setup(options);
  const router = new Router(options);
  if (!options.quiet) {
    router.addEventListener(
      "listen",
      ({ secure, hostname, port }) =>
        console.log(
          `%cListening: %c${
            secure ? "https://" : "http://"
          }${hostname}:${port}`,
          "color:green;font-weight:bold;",
          "color:yellow",
        ),
    );
    router.addEventListener(
      "handled",
      (
        {
          response: { status },
          route,
          request: { url, method },
          measure: { duration },
        },
      ) => {
        const responseColor = status < 400
          ? "color:green"
          : status < 500
          ? "color:yellow"
          : "color:red";
        let path = route?.route;
        if (!path) {
          try {
            path = new URL(url).pathname;
          } catch {
            // just swallow errors here
          }
        }
        console.log(
          `%c${method} ${path} - [${status}] ${duration.toFixed(2)}ms`,
          responseColor,
        );
      },
    );
  }
  return router;
}
