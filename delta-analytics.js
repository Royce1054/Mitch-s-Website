/* Lead tracking for Mitch's GA4 property (G-LKFGWL2ZL0), on every page of the site.
   Delta loads gtag (Profile > Website > Google Analytics Tracking ID) and runs the cookie
   consent; without consent GA receives cookieless pings, so no cookies are set by this file.
   Every event goes to Mitch's property only (send_to), never to Delta's own tags.

   generate_lead  lead_type: text | call | email | contact_form | home_value_report | market_watch
                  (mark this one as a key event in GA)
   sign_up_start  location: header | saved_search   (intent only; DeltaNET records real sign-ups)

   Form events count submit attempts: Delta validates the form after this listener runs. */
(function () {
  "use strict";
  var ID = "G-LKFGWL2ZL0";

  function send(name, params) {
    if (typeof window.gtag !== "function") return;
    params.send_to = ID;
    window.gtag("event", name, params);
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href");
    var type = /^sms:/i.test(href) ? "text" : /^tel:/i.test(href) ? "call" : /^mailto:/i.test(href) ? "email" : null;
    if (type) {
      send("generate_lead", { lead_type: type, link_text: (a.textContent || "").trim().slice(0, 40) });
    } else if (a.classList.contains("myHomeFinderLinksCreateAccount")) {
      send("sign_up_start", { location: "header" });
    } else if (/\/myaccount\/get\.php\?action=addsearch/.test(href)) {
      send("sign_up_start", { location: "saved_search" });
    }
  }, true);

  document.addEventListener("submit", function (e) {
    var form = e.target;
    var type = null;
    if (form.id === "dmg_marketwatch_form") {
      type = /\/listings\/VMA\.php/i.test(location.pathname) ? "home_value_report" : "market_watch";
    } else if (/\/contact\/index\.php/.test(form.getAttribute("action") || "")) {
      type = "contact_form";
    }
    if (type) send("generate_lead", { lead_type: type });
  }, true);
})();
