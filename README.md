# metamask-e2e

```ts
// make sure page refreshes when network is changed
// https://github.com/MetaMask/metamask-extension/issues/8226
window.ethereum.on("chainIdChanged", () => window.location.reload());
window.ethereum.on("chainChanged", () => window.location.reload());
```
