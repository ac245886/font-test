//Copyright (C) 2023 ading2210
//see README.md for more information

//this script mainly just serves to load the rest of the program

// Updated to use the GitHub raw link as the primary mirror
let mirrors = ["https://raw.githubusercontent.com/ading2210/edpuzzle-answers/main"];

async function try_mirror(mirror) {
  // Fetches open.js from the GitHub raw link
  let r = await fetch(mirror + "/open.js", {cache: "no-cache"});
  let script = await r.text();
  
  // Sets the base_url so the main script knows where to find other files (like main.js)
  window.base_url = mirror;
  eval(script);
}

async function init() {
  if (window.location.hostname == "edpuzzle.hs.vc") {
    alert(
      "To use this, drag this button into your bookmarks bar. Then, run it when you're on an Edpuzzle assignment."
    );
    return;
  }
  
  if (document.dev_env) {
    return try_mirror(document.dev_env);
  }

  for (let mirror of mirrors) {
    try {
      await try_mirror(mirror);
      return;
    } catch (e) {
      console.error("Mirror failed:", mirror, e);
    }
  }

  alert(
    "Error: Could not connect to GitHub. The site might be blocked or the link might be down."
  );
}

init();