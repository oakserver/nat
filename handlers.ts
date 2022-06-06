// Copyright 2022 the oak authors. All rights reserved. MIT License.

/**
 * Handlers,
 * @module
 */

import { Helmet } from "nano-jsx/helmet";
import { renderSSR } from "nano-jsx/ssr";
import { contentType } from "std/media_types";
import { getStyleTag, virtualSheet } from "twind/sheets";

export const sheet = virtualSheet();

/** A handler function which renders JSX and send it to the client.
 *
 * ### Example
 *
 * ```ts
 * import { h, init, render } from "https://deno.land/x/nat/mod.ts";
 * import { App } from "./App.tsx";
 *
 * const router = init();
 * router.get("/", render(<App />));
 * router.listen();
 * ```
 */
export function render(jsx: unknown) {
  return function handler() {
    sheet.reset();
    const page = renderSSR(jsx);
    const styles = getStyleTag(sheet);
    const {
      body,
      head,
      footer,
      attributes: { body: bodyAttributes, html: htmlAttributes },
    } = Helmet.SSR(page);
    return new Response(
      `<!DOCTYPE html>
      <html ${htmlAttributes.toString()}>
      <head>
        ${styles}
        ${head.join("\n")}
      </head>
      <body ${bodyAttributes.toString()}>
        ${body}
        ${footer.join("\n")}
      </body>
      </html>`,
      {
        headers: {
          "content-type": contentType("text/html")!,
        },
      },
    );
  };
}
