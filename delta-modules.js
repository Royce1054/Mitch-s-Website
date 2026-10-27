/* Delta modules: Mitch's copy for DeltaNET's predefined pages, whose templates the admin cannot
   edit. Loaded site-wide by a DeltaNET code snippet; acts only on a page it recognises, by
   Delta's own element ids. If an id is missing (Delta changed its template) it changes nothing
   and Delta's copy shows, because delta-modules.css reveals the intro after 1.2s regardless.
   Styles live in delta-modules.css. Copy follows COLUMBUS-AGENTS.md §2: verified facts only. */
(function () {
  "use strict";

  function text(el, value) { if (el) el.textContent = value; }

  function link(href, label) {
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    return a;
  }

  // Virtual Market Analysis, /listings/VMA.php
  function vma() {
    var desc = document.getElementById("dmg_layout_vma_desc");
    var form = document.getElementById("dmg_marketwatch_form");
    if (!desc || !form) return false;

    text(desc.querySelector("h1"), "See what your house is up against");
    text(desc.querySelector("h2"), "Before you list, it helps to know what buyers will compare your house to.");

    var p = desc.querySelector("p");
    text(p, "Tell me a little about your home and the area around it. You'll get a report of the homes " +
      "for sale nearby, with the average asking price and how many are on the market.");
    var note = document.createElement("p");
    note.append("It counts homes for sale, not closed sales, so read it as your competition, not your price. " +
      "For a number, try the ", link("/my-home-value/", "instant estimate"), ", or ",
      link("/contact/", "ask me for a pricing opinion"), ".");
    if (p) p.after(note);

    var bullets = desc.querySelectorAll(".dmg_vma_bullets .bullet-desc");
    var lines = ["The homes for sale near you that a buyer would weigh against yours",
      "The average asking price, and how many homes are listed",
      "On your schedule: weekly, every two weeks or monthly"];
    for (var i = 0; i < bullets.length && i < lines.length; i++) text(bullets[i], lines[i]);

    text(form.querySelector("h2"), "Get your report");
    text(document.getElementById("dmg_marketwatch_submit"), "Send me the report");
    return true;
  }

  function run() {
    if (vma()) document.documentElement.classList.add("rhc-mod");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
