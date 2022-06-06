# nat

A server side rendering framework for Deno CLI and Deploy.

Incorporating [acorn](https://deno.land/x/acorn/),
[nano-jsx](https://nanojsx.io/), and [twind](https://twind.dev/), it provides
the tooling to provide a server centric framework for providing dynamic websites
served from the edge.

## Getting started

nat as a setup script which makes it easy to scaffold out a project and is the
easiest way to get started. You will need the Deno CLI [installed]() locally and
will want to run the following command within the current directory you want to
setup:

```
> deno run https://deno.land/x/nat/setup.ts
```

The script will prompt you for read and write permissions to the current
directory as well as ask for your confirmation to write out the initial setup
files for the project.

Once the project is setup, edit the `main.tsx` and use `deno task start` to run
your server locally.

You can also deploy the project to [Deno Deploy](https://dash.deno.com/new).

## Concepts

The framework includes the acorn
[Router](https://doc.deno.land/https://deno.land/x/acorn/mod.ts/~/Router). An
instance of the router is returned from the
[init()](https://doc.deno.land/https://deno.land/x/nat/mod.ts/~/init) function.
The acorn router is based of web standard [URLPattern]() API which allows
matching URLs and parsing out values to variables. Those variables are available
in the handler's
[context `.params` property](https://doc.deno.land/https://deno.land/x/acorn/mod.ts/~/Context#params).

The framework comes with [nano-jsx](https://nanojsx.io/) built in, which makes
it easy to server-side render JSX/TSX as a response.

The framework also comes with [twind](https://twind.dev/) integrated which is
well suited to server side rendering of tailwind's functional CSS styles in a
super efficient way.

---

Copyright 2022 the oak authors. All rights reserved. MIT License.
