(() => {
  console.log("loaded");
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertTheme(themeUrl) {
    console.log(themeUrl);
    //TODO: INSERT CSS.
    var link = document.createElement("link");
    link.href = themeUrl;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    document.getElementsByTagName("head")[0].appendChild(link);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingTheme() {
    //TODO: REMOVE CSS.
    console.log("reset");
  }

  /**
   * Listen for messages from the background script.
   * Call "insertBeast()" or "removeExistingBeasts()".
   */
  browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.command === "themeify") {
      insertTheme(message.themeUrl);
    } else if (message.command === "reset") {
      removeExistingTheme();
    }
  });
})();
