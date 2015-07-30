var CV = CV || {};

CV.locale = {
    "en_US" : {
        "prompt" : "visitor@sapk.github.io ~ $",
        "unknown_language" : "unknown language !",
        "command_not_found" : "command not found",
        "command_not_found_maybe" : "command not found maybe you want to use",
        "file_not_found": "file not found",
        "folder_not_found": "folder not found",
        "help_datetime" : `Display current date and time : datetime
    -h Display this help message`,
        "help_date" : `Display current date : date
    -h Display this help message`,
        "help_time" : `Display current time : time
    -h Display this help message`,
        "help_snake" : `Play snake game : snake
    -h Display this help message`,
        "help_open" : `Open a file : open filename
    -h Display this help message`,
        "help_clear" : `Clear the console : clear
    -h Display this help message`,
        "help_history" : `Display commands use in the past : history
    -h Display this help message
    -c Clear the history list
    -n Limit number of line to show`,
        "help_locale" : `Display current locale : locale
    -h Display this help message
    -a Display all locale possible in system`,
        "help_export" : `Manage environment variable : export VARNAME=varvalues
    -h Display this help message
    
    example : export LANG=fr_FR (see locale -a)`,
        "help_env" : `List all environment variable : env
    -h Display this help message`,
        "help_ls" : `Display list file : ls
    -h Display this help message`,
        "help_tree" : `Display tree file : tree
    -h Display this help message`,
        "help_help" : `Display function list and their help message : help [functionname]
    -h Display this help message`,
    },
    "fr_FR" : {
        "prompt" : "visiteur@sapk.github.io ~ $",
        "unknown_language" : "langue inconnue !",
        "command_not_found" : "commande invalide",
        "command_not_found_maybe" : "commande invalide vous vouliez peut-être utiliser",
        "file_not_found": "fichier introuvable",
        "folder_not_found": "dossier introuvable",
        "help_datetime" : `Affiche la date et l'heure courante : datetime
    -h Affiche ce message d'aide`,
        "help_date" : `Affiche la date courante : date
    -h Affiche ce message d'aide`,
        "help_time" : `Affiche l'heure courante : time
    -h Affiche ce message d'aide`,
        "help_snake" : `Jouer au jeu snake : snake
    -h Affiche ce message d'aide`,
        "help_clear" : `Nettoie la console : clear
    -h Affiche ce message d'aide`,
        "help_open" : `Ouvre un fichier : open filename
    -h Affiche ce message d'aide`,
        "help_history" : `Affiche  l'historique des commandes saisies: history
    -h Affiche ce message d'aide
    -c Efface l'historique'
    -n Limite le nombre de ligne à afficher`,
        "help_locale" : `Affiche la langue courante : locale
    -h Affiche ce message d'aide
    -a Affiche toutes les langues possibles `,
        "help_export" : `Gère les variables d'environment : export VARNAME=varvalues
    -h Affiche ce message d'aide
    
    exemple : export LANG=fr_FR (voir locale -a)`,
        "help_env" : `Liste toutes les variables d'environment : env
    -h Affiche ce message d'aide`,
        "help_ls" : `Affiche la liste des fichiers : ls
    -h Affiche ce message d'aide`,
        "help_tree" : `Affiche l'arborescence des fichiers' : tree
    -h Affiche ce message d'aide`,
        "help_help" : `Affiche la liste des fonctions disponibles et leur message d'aide' : help [functionname]
    -h Affiche ce message d'aide`,
    }
}

CV.conf = CV.conf || {};

CV.conf.locale = localStorage.current_locale || "en_US" //TODO use user lang
CV.current_locale = CV.locale[CV.conf.locale]

/*       */