// src/components/util.js
// ------------------------------------------------------
// Utility: dynamic script loader
// Ensures scripts like Typed.js and Iconify load once and
// resolve only after fully available in the DOM.

export function loadScript(src, id) {
  return new Promise((resolve, reject) => {

    // If script already exists, resolve immediately
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    if (id) script.id = id;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}
