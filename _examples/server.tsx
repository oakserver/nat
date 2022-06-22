/** @jsx h */
/** @jsxFrag Fragment */
import { createStyle, Fragment, h, init, render } from "../mod.ts";

const router = init();
const style = createStyle({
  title: "text-xl",
});

const App = ({ name }: { name: string }) => (
  <>
    <div class={style("title")}>Hello {name}!</div>
  </>
);

router.get("/", render(<App name="world" />));

router.listen();
