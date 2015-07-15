// JavaScript Document

if (CookieBanner !== undefined) {
    CookieBanner.setConfig({
        "name":         "allowCookies",
        "expire":       9983369, // 9983369 è il massimo tempo di scadenza di una cookie
        "msg":          "Questo sito utilizzano i cookie. Per navigare, è necessario accettare i termini.",
        "infoLink":     location.href+"#",
        "infoLinkMsg":  "Più informazioni",
        "acceptMsg":    "Accettare"
    });
    CookieBanner.show();
}