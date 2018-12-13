/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "blockchain";

//The url it will be accessed from
exports.address = "explorer.example.com";

// logo
exports.logo = "/images/eyco.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "eyco.ico";

//Theme
exports.theme = "Lumen";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "EYCO";


//coin name, visible e.g. in the browser window
exports.coin = "Eyco";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "eyco",
  "password": "3xp!0reR",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 10823,
  "user" : "eyco",
  "pass" : "password"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "bitcointalk": false,
  "website": false,
  "slack": false,
  "github": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "masternodes": true,
  "coininfo": true,
  "coinmarketcap": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 25616,
  "blockhash": "2605cfb26456f79a466e298c948c6809982c78268c803054e6fb61140015f2d4",
  "txhash": "3d54d3f7ad09617404507261f26e65715671eda8978ddf184580457edefb6ff1",
  "address": "D2951jbCCunpUMzm2UwxKsFykyZUE8dmmk"
},

// markets
exports.markets = {
  "coin": "EYCO",
  "exchange": "BTC",
  "enabled": ['coinexchange'],
  "coinexchange_id": "1042",
  "default": "coinexchange"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 0,
  "low_flag": 100000,
    "high_flag": 50000000
},

exports.masternodes = {
  "default_port": 0,
  "list_format": {
    "address": 3,
    "status": 1,
    "lastseen": 4,
    "lastpaid": 6,
    "ip": 8
  }
},

exports.coininfo = {
  "basic_info_links": [],
  "masternode_required": 1000000,
  "block_time_sec": 73,
  "block_reward_mn": 2184
},

exports.coinmarketcap = {
  "ticker": "EYCO"
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POS",
  "last_txs": 100
};

// twitter
exports.twitter = "TechEyco";
exports.facebook = "yourfacebookpage";
exports.googleplus = "yourgooglepluspage";
exports.bitcointalk = "yourbitcointalktopicvalue";
exports.website = "https://eyco-tech.net";
exports.slack = "yourcompleteslackinviteurlincludingtheprotocol";
exports.github = "EyCoTech/Eyco";

exports.confirmations = 66;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "c23ac15dfd0fdd3eeb684a97e6329e88e048579eb7d3d108b8678935ba5d05ee";
exports.genesis_block = "64fa0bfdd6613ee89198d680567d858765ced5c1fb02d7312ac71609cf0ca6d5";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = false;
exports.supply = "TXOUTSET";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
