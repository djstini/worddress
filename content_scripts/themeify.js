(() => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  insertTheme();
  /**
   * Given the name of a Theme, get the URL to the corresponding stylesheet.
   */
  function themeNameToURL(themeName) {
    switch (themeName) {
      case "Dracula":
        return browser.runtime.getURL("themes/dracula.css");
      case "Catppuccin-Mocha":
        return browser.runtime.getURL("themes/catppuccin-mocha.css");
      default:
        return false;
    }
  }

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertTheme() {
    try {
      browser.storage.sync.get("themeName").then((response) => {
        themeUrl = themeNameToURL(response.themeName);
        const oldStyle = document.getElementById("worddress-style");
        oldStyle && oldStyle.remove();
        var link = document.createElement("link");
        link.href = themeUrl;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        link.id = "worddress-style";
        document.getElementsByTagName("head")[0].appendChild(link);
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingTheme() {
    const oldStyle = document.getElementById("worddress-style");
    oldStyle && oldStyle.remove();
  }

  /**
   * Listen for messages from the background script.
   * Call "insertBeast()" or "removeExistingBeasts()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "themeify") {
      insertTheme();
    } else if (message.command === "reset") {
      removeExistingTheme();
    }
  });
})();
