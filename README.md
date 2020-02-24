# rust-node-ffi

## Description
This project explores `node-ffi` (Foreign Function Interface) that allows a `npm` project to call functions written in `Rust` for expensive calculations.

This project calculates fibonacci number in both `rust` and `node` and outputs the time it takes to complete the computation and the results from both functions. 

The program takes an optional input (default to 30 if not provided) from the command line.

## Tools / Prerequisites
1. This project runs on `Windows 10 OS`
2. Make sure the following tools are installed
    - nodejs v12.16.1
    - npm 6.13.4
    - cargo 1.41.0 (626f0f40e 2019-12-03)

## How-to
1. install node dependencies
    - `npm install`
    - note that current version of `ffi` does not support node 12, need to install a custom version of `ffi` forked from the original repo instead
2. build cargo
    -  `npm run build`
3. run the project
    - `npm start`
    - use custom input: `npm start 20`
        - **Integer Overflow**: Current implementation in `rust` version uses `u32` for both input and output data type, which means the calculated result could go overflow with `input >= 48`.
- *Optional* commands
    - clean up rust build: `npm run clean`

## Troubleshoot build errors:
- `Dynamic Linking Error: Win32 error 193`
  - This error occurs if the `rust` compiler builds 32-bit of the library instead of 64-bit. You will need to update `rustc` `toolchain` to support building 64-bit lib. Run the following 2 commands to install and use `x86_64-pc-windows-gnu` as the `target_arg`:
      ```
      rustup toolchain install stable-x86_64-pc-windows-gnu
      
      rustup default stable-x86_64-pc-windows-gnu
      ```
  - References:
      - [Microsoft Windows Dev Center](https://docs.microsoft.com/en-us/windows/win32/debug/system-error-codes--0-499-)
      - [Rust Conditional Compilation](https://doc.rust-lang.org/reference/conditional-compilation.html#target_arch)
      - [Rust Installation](https://forge.rust-lang.org/infra/other-installation-methods.html)

## Other references
- [node-ffi tutorial](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)
- [rust data types & integer-overflow](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow)