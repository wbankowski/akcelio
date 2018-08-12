---
title: When exporting the API of a Node module, why can we sometimes use exports and other times we have to use module.exports?
category: The Node.js knowledge (Q&A)
draft: false
date: 2018-08-12
description: Node.js
---

The `exports` variable is available within a module's file-level scope, and is assigned the value of `module.exports` before the module is evaluated.

It allows a shortcut, so that module.exports.something = ... can be written more succinctly as exports.something = ... However, like any variable, if a new value is assigned to `exports`, it is no longer bound to `module.exports`.
