console.log("BACKGROUND PAGE LAUNCHED");

chrome.runtime.onMessage.addListener(
  async(request, sender, sendResponse) => {
    switch (request.action) {
      case "getFullAXTree":
        await attachDebuggerToActiveTab();
        const tree = await getFullAccessibilityTree();
        console.log("Full tree", tree);
        break;
      case "getPartialAXTree":
        await attachDebuggerToActiveTab();
        const partialTree = await getPartialAccessibilityTree(request.input);
        console.log(`Tree for ${request.input} selector`, partialTree);
        break;
      case "queryAXTree":
        await attachDebuggerToActiveTab();
        const queryResult = await queryAccessibilityTree(request.input, request.inputSec);
        console.log(`Query result for A11Y Name ${request.input} and Role ${request.inputSec}`, queryResult);
      default:
    }
    if (request.action === "getFullAXTree")
    {
      await attachDebuggerToActiveTab();
      const tree = await getFullAccessibilityTree();
      console.log(tree);
    }
  }
);

function getCurrentTab() {
  return new Promise((res) => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      res(tabs[0])
    });
  });
}

async function attachDebuggerToActiveTab() {
  const tab = await getCurrentTab();

  if (tab.url.startsWith('http')) {
    return new Promise((res) => {
      chrome.debugger.attach({ tabId: tab.id }, '1.2', res);
    });
  } else {
    throw new Error('Debugger can only be attached to HTTP/HTTPS pages.');
  }
}

async function getFullAccessibilityTree() {
  const tab = await getCurrentTab();
  return new Promise((res) => {
    chrome.debugger.sendCommand(
      { tabId: tab.id },
      'Accessibility.getFullAXTree',
      {},
      res
    );
  });
}

async function getDocumentNode() {
  const tab = await getCurrentTab();
  return new Promise((res) => {
    chrome.debugger.sendCommand(
      { tabId: tab.id },
      'DOM.getDocument',
      {},
      res
    );
  });
}

async function getElementByCssSelector(cssSelector) {
  const tab = await getCurrentTab();
  const documentNode = await getDocumentNode();
  return new Promise((res) => {
    chrome.debugger.sendCommand(
      { tabId: tab.id },
      'DOM.querySelector',
      { nodeId: documentNode.root.nodeId, selector: cssSelector },
      res
    );
  });
}

async function getPartialAccessibilityTree(cssSelector) {
  const node = await getElementByCssSelector(cssSelector);
  const tab = await getCurrentTab();
  return new Promise((res) => {
    chrome.debugger.sendCommand(
      { tabId: tab.id },
      'Accessibility.getPartialAXTree',
      { nodeId: node.nodeId },
      res
    );
  });
}

async function queryAccessibilityTree(accessibleName, role) {
  const tab = await getCurrentTab();
  const documentNode = await getDocumentNode();
  return new Promise((res) => {
    chrome.debugger.sendCommand(
      { tabId: tab.id },
      'Accessibility.queryAXTree',
      { nodeId: documentNode.root.nodeId, accessibleName, role },
      res
    );
  });
}
