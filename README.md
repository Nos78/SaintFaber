# SaintFaber
Discord Bot for the MMORPG Albion Online

+ Provides your guild with an interactive data retrieval system the game's published API's, as well as the available unofficial API's from 3rd party websites, such as Albion Online 2D,
+ Plus a whole host of guild-related administration features to make the running of your discord server an absolute breeze!

*This Bot uses [DiscordJS](https://discord.js.org/#/) - An object-oriented node.js wrapper for the official Discord API.*

## About SaintFaber
*This project is derived from an existing Discord Bot, MrData https://github.com/nos78/MrData which was an alliance scoring bot and discord assistant for the mobile-based MMO Star Trek Fleet Command.*

**This project is currently in development and may not be functioning correctly. Please contact the author for any questions in the first instance.**

NOTE: This README Has not yet been adapted for this bot and from this point onwards, this README is actually describing the steps to take to install the MrData bot and not SaintFaber - whilst there may be similarities, do NOT assume that any of these steps described below will actually work for this implementation!




The following steps are NOT for this bot and may/or may not be correct! You have been warned...


##### Project requirements:

+ nodejs (https://nodejs.org/en/download/)
+ Postgres (https://www.postgresql.org/download/)
+ A valid discord user token (https://discordapp.com/developers/applications/me)
Postgres need not be running on target machine, and there are many free hosting options.  MrData can be configured to work with any Postgres database, locally or in the cloud.

**Note:** *This installation guide will not take you through the process of using the [Discord developer portal](https://discordapp.com/developers/applications/me) to obtain a valid token and connect the bot to a server.  If the portal seems complicated, there are plenty of [idiot's guides](https://anidiots.guide/first-bot) and [how-to's](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/)  that will take you through this process, step-by-step.*

##### Installing the dependancies:
Once you have installed node on your development machine (and the production environment), there are various node.js dependancies that need to be installed via a shell window, using the `npm` package manager and the project `packages.json` file.



## Getting started:

1. Set up node
2. Configure postgres
3. Obtain a discord application token
4. Modify `config-secret.json`
5. Run the bot.


### 1. Set up node:

1. [Download](https://nodejs.org/en/download/) & install node.
2. [Clone](https://github.com/Nos78/MrData.git) the MrData repository.
3. Install the dependancies.

##### Install dependancies
The project dependancies can be installed using the command
```bash
npm install
```

**Note:** *please see the section below for instructions on updating the dependancies to the latest versions and simultaneously updating* `packages.json` *to reflect these changes.*

## Upgrading node dependancies
+ Although `npm update` will update all modules present in `package.json` to their latest versions, the changes will not automatically be applied back to `package.json`!

 **Existing behaviour:** `npm update` installs the latest versions of modules from the npm repositories while respecting the caret and tilde dependencies specified in the package.json file.  Although the modules are updated to the latest versions, the versions mentioned in the `package.json` file are *not* changed. This leads to confusion, since it creates a mismatch between the installed versions in `node_modules` repository and the (now older) versions mentioned in package.json file.

**There is a fix:** To ensure you update to the latest version *and* update the package.json to reflect the changes, perform the following steps using a shell window:


1. Install the `ncu` utility globally:
```bash
npm install –g npm-check-updates
```
This can be invoked with the command `ncu`.

**Nb:** `ncu` is a short form of npm-check-updates, and displays the output without actually performing any changes.*

2. Update the package.json file, as per latest versions available from the npm repositories on web:
```bash
ncu –u
```

3. Finally, update the local node_modules repository with the versions present in package.json, as you would do normally.  But now, Both the `package.json` and the local `node_modules` repository are updated to the latest versions available on web.
```bash
npm install
```

### 2. Configure postgres

This guide is not going to take you through the steps to setup your own Postgres database.  You can either [download](https://www.postgresql.org/download/) and run the postgres server on your machine(s), or use a [free host](https://www.elephantsql.com/).  If you're unsure about setting up the software on your own machine, or are wary of opening ports, then use a free hosting service.

**Take a note** of the following information:
+ database URL, e.g. [somewebservice.org.uk](somewebservice.org.uk)
+ port (usually 5432)
+ username
+ password
+ Database name

**Note:** Postgres databases can be connected to via a long URL, of the form [postgres://username:password@localhost:5432/databasename'](postgres://username:password@localhost:5432/databasename'), but we *will not* be using such a connection string.

Instead, we will specify this informmation in the `config-secret.json` file.


### 3. Obtain a discord application token
You must register your bot in order to use the discord API.  You do this via the [discordapp.com developer application portal](https://discordapp.com/developers/applications/me).

A simple internet search reveals a large quantity of tutorials.  Take a note of the discord application token.

### 4. Modify `config-secret.json`
With all the information you have taken a note of, it's time to edit the `config-secret.json` file.  The file will look something like this:

```JSON
{
  "db": {
    "host": "clamtastic.hopto.org",
    "port": 2345,
    "database": "postgres",
    "user": "postgres",
    "password": "postgres",
    "max": 5,
    "idleTimeoutMillis": 5000
  },
  "token": "ABCDEFGHIJKLMNOPQRSTUVWXYZ.abcdefghijklmnopqrstuvwxyz"
}
```

The additional parameters can be tweaked by you.  For example, although the default numnber of concurrent connections in pg-promose is 10, the maximum for [https://www.elephantsql.com/](https://www.elephantsql.com/) is 5.

### 5. Run the bot!
You have joined it to your server already, haven't you!?  Simply open your shell, navigate to the project directory, and type:

```bash
node bot.js
```
