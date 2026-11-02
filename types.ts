// Copyright 2018-2022 the oak authors. All rights reserved. MIT license.
//
// Vendored from oak_commons@0.3.1/types.d.ts
// (https://deno.land/x/oak_commons@0.3.1/types.d.ts). The `oakserver/commons`
// package is retired and archived with no successor module, so the single type
// this module needs is kept here rather than imported from the frozen package.

/**
 * Contains abstract types and interfaces used in other parts of oak_common.
 *
 * @module
 */

/** Types of data that can be signed cryptographically. */
export type Data = string | number[] | ArrayBuffer | Uint8Array;

/** Types of keys that can be used to sign data. */
export type Key = string | number[] | ArrayBuffer | Uint8Array;

/** An abstract interface for a keyring which handles signing of data based on
 * a string based digest. */
export interface KeyRing {
  /** Given a set of data and a digest, return the key index of the key used
   * to sign the data. The index is 0 based. A non-negative number indices the
   * digest is valid and a key was found. */
  indexOf(data: Data, digest: string): Promise<number> | number;
  /** Sign the data, returning a string based digest of the data. */
  sign(data: Data): Promise<string> | string;
  /** Verifies the digest matches the provided data, indicating the data was
   * signed by the keyring and has not been tampered with. */
  verify(data: Data, digest: string): Promise<boolean> | boolean;
}
