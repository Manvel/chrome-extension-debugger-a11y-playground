# chrome-extension-debugger-a11y-playground

Just a simple playground for testing out the Chrome Extension Debugger API and accessibility tree.
You might want to open dev tools for the service worker page to see the console logs.

## getFullAXTree

Outputs the full accessibility tree for the current page in the service worker console.

Documentation: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getFullAXTree

## getPartialAXTree

Query page using CSS to pick out a specific element and then outputs the accessibility tree for that element in the service worker console.

Documentation: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getPartialAXTree

## queryAXTree

Query root node for accessible name and role.

Documentation: https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-queryAXTree
