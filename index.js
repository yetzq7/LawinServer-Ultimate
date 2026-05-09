const fs = require("fs");
const ini = require("ini");

const raw = fs.readFileSync("./config/config.ini", "utf-8");
const config = ini.parse(raw);

function logBool(section, key, label) {
    const value = config?.[section]?.[key];

    console.log(`[${section}] ${label} = ${value}`);
}

console.log("ULTIMATE CONFIG LOADED!")

logBool("Config", "bUseConfigDisplayName", "Use Display Name");
logBool("Profile", "bCompletedSeasonalQuests", "Seasonal Quests");
logBool("Profile", "bGrantFoundersPacks", "Founder Packs");
logBool("Profile", "bAllSTWEventsActivated", "STW Events");

logBool("Events", "bEnableGeodeEvent", "Geode Event");
logBool("Events", "bEnableCubeLake", "Cube Lake");
logBool("Events", "bEnableCrackInTheSky", "Crack in the sky");
logBool("Events", "bEnableBlockbusterRiskyEvent", "Blockbuster Event");
console.log("Ultimate || Started hosting on 127.0.0.1")


const Express = require("express");
const express = Express();
const path = require("path");
const cookieParser = require("cookie-parser");

express.use(Express.json());
express.use(Express.urlencoded({ extended: true }));
express.use(Express.static('public'));
express.use(cookieParser());

express.use(require("./structure/party.js"));
express.use(require("./structure/discovery.js"))
express.use(require("./structure/privacy.js"));
express.use(require("./structure/timeline.js"));
express.use(require("./structure/user.js"));
express.use(require("./structure/contentpages.js"));
express.use(require("./structure/friends.js"));
express.use(require("./structure/main.js"));
express.use(require("./structure/storefront.js"));
express.use(require("./structure/version.js"));
express.use(require("./structure/lightswitch.js"));
express.use(require("./structure/affiliate.js"));
express.use(require("./structure/matchmaking.js"));
express.use(require("./structure/cloudstorage.js"));
express.use(require("./structure/mcp.js"));

const port = process.env.PORT || 3551;
express.listen(port, () => {
    console.log("LawinServer Ultimate started listening on port", port);

    require("./structure/xmpp.js");
}).on("error", (err) => {
    if (err.code == "EADDRINUSE") console.log(`\x1b[31mERROR\x1b[0m: Port ${port} is already in use!`);
    else throw err;

    process.exit(0);
});

try {
    if (!fs.existsSync(path.join(process.env.LOCALAPPDATA, "LawinServer"))) fs.mkdirSync(path.join(process.env.LOCALAPPDATA, "LawinServer"));
} catch (err) {
    // fallback
    if (!fs.existsSync(path.join(__dirname, "ClientSettings"))) fs.mkdirSync(path.join(__dirname, "ClientSettings"));
}

// if endpoint not found, return this error
express.use((req, res, next) => {
    var XEpicErrorName = "errors.com.lawinserver.common.not_found";
    var XEpicErrorCode = 1004;

    res.set({
        'X-Epic-Error-Name': XEpicErrorName,
        'X-Epic-Error-Code': XEpicErrorCode
    });

    res.status(404);
    res.json({
        "errorCode": XEpicErrorName,
        "errorMessage": "Sorry the resource you were trying to find could not be found",
        "numericErrorCode": XEpicErrorCode,
        "originatingService": "any",
        "intent": "prod"
    });
});


console.log("||| Made by Lawin")

console.log("||| Modified by yetzq7")