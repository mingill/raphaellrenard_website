(function () {
  "use strict";

  var paths = {
    "menu-outline": '<path d="M3 6h18M3 12h18M3 18h18"/>',
    "close-outline": '<path d="m6 6 12 12M18 6 6 18"/>',
    "bonfire-outline": '<path d="M12 21a6 6 0 0 0 5.5-8.4c-.8 1.4-2 2.2-3.5 2.4.8-3.8-1.2-7.2-4.5-10-.2 2.4-1.2 4.2-2.5 5.7A6 6 0 0 0 12 21Z"/>',
    "heart-circle-outline": '<circle cx="12" cy="12" r="9"/><path d="M12 16s-4-2.5-4-5a2.2 2.2 0 0 1 4-1.2A2.2 2.2 0 0 1 16 11c0 2.5-4 5-4 5Z"/>',
    "help-outline": '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.4 1.8c-1.2 1.1-1.9 1.4-1.9 3M12 17h.01"/>',
    "leaf-outline": '<path d="M20 4C11 4 5 7 5 13c0 4 3 7 7 7 6 0 8-7 8-16Z"/><path d="M4 21c3-5 7-8 13-11"/>',
    "people-outline": '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 15a5 5 0 0 1 6 5"/>',
    "logo-instagram": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    "logo-amazon": '<path d="M4 8.5c1.5-3 7-4.5 10.5-2.5 2.2 1.2 3.5 3.8 3.5 6.7v2.1c0 1.2.5 2.2 1.5 2.8"/><path d="M5 18.5c4.5 2.4 9.5 2.2 14-.1"/><path d="m17 16 2.5 1.5-1.5 2.5"/>',
    "arrow-back-outline": '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    "arrow-forward-outline": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "flash-outline": '<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>',
    "cloudy-outline": '<path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z"/>',
    "color-filter-outline": '<circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 0 1 10 10M12 22A10 10 0 0 1 2 12M2 12a10 10 0 0 1 10-10M22 12a10 10 0 0 1-10 10"/>',
    "skull-outline": '<circle cx="12" cy="11" r="7"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><path d="M9 17v4h6v-4M10 15h4"/>',
    "person-outline": '<circle cx="12" cy="7" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    "eye-outline": '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    "shuffle-outline": '<path d="M3 7h3c4 0 6 10 10 10h5M17 4l4 3-4 3M3 17h3c1.5 0 2.6-.8 3.5-2M17 14l4 3-4 3"/>',
    "text-outline": '<path d="M4 5h16M12 5v14M8 19h8"/>',
    "bulb-outline": '<path d="M9 18h6M10 22h4M8 14a6 6 0 1 1 8 0c-1.2 1-1.5 2-1.5 4h-5c0-2-.3-3-1.5-4Z"/>',
    "finger-print-outline": '<path d="M12 11a2 2 0 0 1 2 2v6M8 13a4 4 0 0 1 8 0v5M5 13a7 7 0 0 1 14 0v2M12 3a10 10 0 0 1 10 10M2 13A10 10 0 0 1 12 3"/>',
    "trail-sign-outline": '<path d="M4 5h16l-4 4 4 4H4l4-4zM12 13v8"/>',
    "magnet-outline": '<path d="M5 4v8a7 7 0 0 0 14 0V4M5 8h5M14 8h5"/>',
    "earth-outline": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    "heart-half-outline": '<path d="M12 20S4 15 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z"/><path d="M12 8v12"/>',
    "sparkles-outline": '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7ZM5 14l.7 2.3L8 17l-2.3.7L5 20l-.7-2.3L2 17l2.3-.7Z"/>',
    "color-palette-outline": '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M12 21c4 0 4-2 2-3s-2-4 1-4h3"/>'
  };

  var localAssets = {
    "menu-outline": "menu-outline.svg",
    "close-outline": "close-outline.svg",
    "magnet-outline": "magnet-outline.svg",
    "earth-outline": "earth-outline.svg",
    "heart-half-outline": "heart-half-outline.svg",
    "color-filter-outline": "color-filter-outline.svg",
    "color-palette-outline": "color-palette-outline.svg",
    "logo-amazon": "logo-amazon.svg",
    "logo-instagram": "logo-instagram.svg"
  };

  function createSvg(icon, content) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var name = icon.getAttribute("name");
    var className = icon.getAttribute("class");

    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    if (name) svg.setAttribute("name", name);
    svg.setAttribute("fill", "currentColor");
    svg.innerHTML = content;
    return svg;
  }

  var scriptUrl = document.currentScript && document.currentScript.src;
  var assetBase = scriptUrl
    ? new URL("../img/icons/", scriptUrl)
    : null;

  document.querySelectorAll("ion-icon").forEach(function (icon) {
    var name = icon.getAttribute("name");

    if (localAssets[name] && assetBase) {
      fetch(new URL(localAssets[name], assetBase))
        .then(function (response) {
          if (!response.ok) throw new Error("Icon asset unavailable");
          return response.text();
        })
        .then(function (source) {
           var asset = new DOMParser().parseFromString(source, "image/svg+xml");
          var markup = asset.documentElement.innerHTML
            .replace(/#000/gi, "currentColor");
          icon.replaceWith(createSvg(icon, markup));
        })
        .catch(function () {
          icon.replaceWith(createSvg(icon, paths[name]));
        });
      return;
    }

    var svg = createSvg(icon, paths[name] || paths["sparkles-outline"]);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    icon.replaceWith(svg);
  });
})();
