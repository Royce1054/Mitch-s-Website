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

  // Market Watch, /market-watch/
  function marketWatch() {
    var layout = document.getElementById("dmg_marketwatch_layout");
    var form = document.getElementById("dmg_marketwatch_form");
    if (!layout || !form) return false;

    text(layout.querySelector("h1"), "Watch your market before you sell");
    text(document.getElementById("dmg_marketwatch_heading"), "What's selling near you, and for how much");

    var p = document.getElementById("dmg_marketwatch_openText");
    text(p, "Pick an area and how often you want it. You'll get an email with the homes that recently " +
      "sold there, their sale prices and days on market, what's newly listed, and the average price.");
    var note = document.createElement("p");
    note.append("Selling soon? See the homes yours would compete with in the ",
      link("/listings/VMA.php", "market analysis"), ", or ", link("/contact/", "ask me for a pricing opinion"), ".");
    if (p) p.after(note);

    var features = layout.querySelectorAll(".dmg_marketwatch_feature p");
    var lines = ["Recent sales, with the sale price and days on market",
      "Homes newly listed nearby",
      "Homes for sale in your area",
      "The average price, and how many homes are listed"];
    for (var i = 0; i < features.length && i < lines.length; i++) text(features[i], lines[i]);

    // The sample report opens from Delta's click handler on this container; only its face changes.
    var preview = document.getElementById("dmg_marketwatch_preview");
    if (preview) {
      var sample = document.createElement("span");
      sample.className = "rhc-mw-sample";
      sample.textContent = "See a sample report";
      preview.append(sample);
    }

    text(document.getElementById("dmg_marketwatch_formHeading"), "Get it by email");
    var or = form.querySelector(".dmg_marketwatch_orImage");
    if (or) {
      var word = document.createElement("span");
      word.className = "rhc-mw-or";
      word.textContent = "or";
      or.after(word);
    }
    var map = document.getElementById("dmg_marketwatch_showmap");
    if (map) map.firstChild.textContent = "Pick a radius on the map";
    var contact = document.getElementById("agent_contact");
    if (contact && contact.nextElementSibling) {
      contact.nextElementSibling.id = "rhc-mw-contact";
      text(contact.nextElementSibling, "I'd like Mitch to contact me");
    }

    // Delta's submit is an image of the words "Sign Up". It has no name, so as a plain submit
    // button it sends exactly the same form.
    var submit = document.getElementById("dmg_marketwatch_submit");
    if (submit && submit.type === "image") {
      submit.type = "submit";
      submit.removeAttribute("src");
      submit.value = "Send me Market Watch";
    }
    return true;
  }

  // Instant estimate, /my-home-value/ (the address search; its report keeps Delta's copy)
  function homeValue() {
    var info = document.getElementById("homeInformation");
    if (!info || !document.getElementById("my_home_value")) return false;

    text(document.querySelector("#dmg_layout_quickSearch .tab > label"), "What's your home worth?");
    text(document.querySelector("#dmg_layout_quickSearch .content > .avm_desc"),
      "Enter your address for up to three automated estimates of its value.");

    text(info.querySelector("h1"), "A starting number, in seconds");
    var p = info.querySelectorAll("p");
    text(p[0], "The estimates come from automated valuation models. They can't see inside your home or " +
      "know what you've updated, so treat them as a range to start from, not a price.");
    text(p[1], "Your report also shows:");
    var items = info.querySelectorAll("li");
    var lines = ["Buyer demand: how many registered home shoppers are looking for a home like yours",
      "The local market: homes for sale, the average price and average days on market",
      "Homes for sale near you, with their prices and days on market"];
    for (var i = 0; i < items.length && i < lines.length; i++) text(items[i], lines[i]);
    if (p[2]) {
      p[2].textContent = "";
      p[2].append("Want a number you can list at? I'll give you an honest pricing opinion based on what " +
        "has actually closed near you. ", link("sms:+16164308838", "Text me at 616-430-8838"), ".");
    }
    return true;
  }

  // Contact, /contact/
  function contact() {
    var box = document.getElementById("agent-contact-form");
    if (!box) return false;
    var note = document.createElement("p");
    note.className = "rhc-contact-note";
    note.textContent = "Text or call me, or send a note here. You'll hear back from me, not an assistant.";
    var h2 = box.querySelector("h2");
    if (h2) h2.after(note);
    return true;
  }

  function run() {
    if (vma() || marketWatch() || homeValue() || contact()) document.documentElement.classList.add("rhc-mod");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
