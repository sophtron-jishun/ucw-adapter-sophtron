# Sophtron Adapter for the UCW

[![npm version](https://badge.fury.io/js/@ucp-npm%2Fsophtron-adapter.svg)](https://badge.fury.io/js/@ucp-npm%2Fsophtron-adapter)

This is the adapter that makes it possible to connect with Sophtron via the Universal Connect Widget.

## Installation

This package is meant to be used with the Universal Connect Widget. If you have forked the UCW project, you can install it as a dependency of the widget.

Navigate to your forked project and, from the root of the project, run:

```bash
npm i @ucp-npm/sophtron-adapter --workspace apps/server
```
## Usage

Once you have the npm package installed, you can set up the ucw to use it.

In the `./apps/server/adapterSetup.ts` file, do the following:

Import `getSophtronAdapterMapObject` from the Sophtron adapter package:

```typescript
import { getSophtronAdapterMapObject } from "@ucp-npm/sophtron-adapter";
```

Import the logger:

```typescript
import * as logger from "./infra/logger";
```

Next, look for the line that starts with `export const adapterMap = {`, and add the adapter map as follows:

```typescript
const sophtronAdapterMapObject = getSophtronAdapterMapObject({
    logClient: logger,
    aggregatorCredentials: {
        username: config.SophtronApiUserId,
        password: config.SophtronApiUserSecret,
    },
    envConfig: {
        HOSTURL: config.HOSTURL
    },
});

export const adapterMap = {
  ...sophtronAdapterMapObject,
  ...testAdapterMapObject,
};
````

The `logClient` dependency is provided by the Universal Connect Widget.

## Published NPM Package

https://www.npmjs.com/package/@ucp-npm/sophtron-adapter

## More Info

See [https://universalconnectproject.org/](https://universalconnectproject.org/) for more information.

