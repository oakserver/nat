/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, init, render, tw } from "../mod.ts";

const router = init();

const App = ({ name }: { name: string }) => (
  <>
    <div class={tw`text-xl`}>Hello {name}!</div>
  </>
);

router.get("/", render(<App name="world" />));

router.listen();
