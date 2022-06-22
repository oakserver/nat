// Copyright 2022 the oak authors. All rights reserved. MIT License.

/** An abstraction over twind which allows creating re-usable styles that can
 * then be inlined into HTML or JSX classes.
 *
 * ### Example
 *
 * ```ts
 * import { createStyle, h } from "https://deno.land/x/nat/mod.ts";
 *
 * const style = createStyle({
 *   title: "font-xl bold",
 *   link: "underline",
 * });
 *
 * function App() {
 *   return (
 *     <div>
 *       <h1 class={style("title")}>Title<h1>
 *       <a href="./a" class={style("link")}>a</a>
 *     </div>
 *   );
 * }
 * ```
 *
 * @module
 */

import { type CSSRules, type Directive, type Token, tw } from "twind";

function isIterator<Keys extends string>(
  value: unknown,
): value is Iterable<[Keys, string]> {
  return typeof value === "object" && value !== null &&
    Symbol.iterator in value;
}

export interface StyleFunction<Keys extends string> {
  /** For a provided style key, return a string value after having been
   * processed by the {@linkcode tw} function. */
  (style: Keys): string;
  /** For a provided style key, return the original value passed to the the
   * factory {@linkcode createStyle} function. */
  (style: Keys, raw: boolean): Token;
}

/** A factory function that will return a {@link StyleFunction} that will make
 * it easy to re-use groupings of twind/tailwind classes. */
export function createStyle<Keys extends string>(
  styles:
    | Record<Keys, string | Directive<CSSRules>>
    | Iterable<[Keys, Directive<CSSRules>]>,
): StyleFunction<Keys> {
  const s =
    (isIterator(styles)
      ? Object.fromEntries(styles) as Record<Keys, string>
      : styles) as Record<Keys, string | Directive<CSSRules>>;
  return function style(style: Keys, raw: boolean) {
    const value = s[style] ?? "";
    return raw ? value : tw(value);
  } as StyleFunction<Keys>;
}
