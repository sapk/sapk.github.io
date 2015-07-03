var CV = CV || {};

CV.locale = {
    "en_US" : {
        "unknown_language" : "unknown language !"
    },
    "fr_FR" : {
        "unknown_language" : "langue inconnue !"
    }
}

CV.conf = CV.conf || {};

CV.conf.locale = localStorage.current_locale || "en_US" //TODO use user lang
CV.current_locale = CV.locale[CV.conf.locale]
