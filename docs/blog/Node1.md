---
title: What is the relationship between Node.js and V8? Can Node work without V8?
category: The Node.js knowledge (Q&A)
draft: false
description: Node.js
date: 2018-08-12
---

## What is the relationship between Node.js and V8?

V8 is the Javascript engine inside of Node.js that parses and runs your Javascript. The same V8 engine is used inside of Chrome to run JavaScript in the Chrome browser. Google open-sourced the V8 engine and the builders of Node.js used it to run JavaScript in Node.js.

## Can Node.js work without V8?

No. The current Node.js binary cannot work without V8. It would have no Javascript engine and thus no ability to run code which would obviously render it non-functional. Node.js was not designed to run with any other Javascript engine and, in fact, all the native code bindings that come with Node.js (such as the fs module or the net module) all rely on the specific V8 interface between C++ and JavaScript.

There is an effort by Microsoft to allow the Chakra Javascript engine (that's the engine in Edge) to be used with Node.js. This project enables Node.js to optionally use the ChakraCore JavaScript engine. To enable building and running Node.js with the ChakraCore JavaScript engine, a V8 API shim (ChakraShim) is created on top of the ChakraCore runtime hosting API. ChakraShim implements the most essential V8 APIs so that the underlying JavaScript engine change is transparent to Node.js and other native addon modules written for V8.
