import { Gaia } from "@/bot";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { env } from "process";

const isCommandFile = (file: string) =>
  file.endsWith(".js") || (env.NODE_ENV == "DEV" && file.endsWith(".ts"));

export default async function refreshInteractions(
  gaia: Gaia,
  rest: REST,
  CLIENT_ID: string
) {
  gaia.logger.info("Declaring application commands...");
  const commands = [];
  const PACKAGES = ["general"];
  const commandFiles = [
    {
      dir: "",
      files: fs
        .readdirSync(path.join(__dirname, "/commands"))
        .filter(isCommandFile),
    },
  ];

  for (const packageString of PACKAGES) {
    const packageFile = path.join(__dirname, "/commands", packageString);
    if (fs.existsSync(packageFile)) {
      commandFiles.push({
        dir: packageString,
        files: fs.readdirSync(packageFile).filter(isCommandFile),
      });
    }
  }
  for (const packageFile of commandFiles) {
    for (const file of packageFile.files) {
      const fileRequire = await import(`./commands/${packageFile.dir}/${file}`);
      const cmdData = fileRequire.default;
      if (cmdData) {
        commands.push(cmdData.data);
        if (gaia.commands) {
          gaia.commands.set(cmdData.data.name, cmdData);
        }
      }
    }
  }
  rest
    .put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })
    .then(() => {
      gaia.logger.info(`Refreshed ${commands.length} application commands.`);
    })
    .catch((x) => {
      gaia.logger.error("! Failed to load commands!");
      gaia.logger.error(x);
    });
  /*
  TODO: This can be added in as we add context menus, select menus, etc.
  const contextMenuFiles = [
    {
      dir: "",
      files: fs
        .readdirSync(path.join(__dirname, "/contexts"))
        .filter(isCommandFile),
    },
  ];
  for (const packageString of PACKAGES) {
    const packageFile = path.join(__dirname, "/contexts", packageString);
    if (fs.existsSync(packageFile)) {
      contextMenuFiles.push({
        dir: packageString,
        files: fs.readdirSync(packageFile).filter(isCommandFile),
      });
    }
  }
  for (const packageFile of contextMenuFiles) {
    for (const file of packageFile.files) {
      const fileRequire = await import(`./contexts/${packageFile.dir}/${file}`);
      const contextMenuData = fileRequire.default;
      if (contextMenuData) {
        commands.push(contextMenuData.data);
        if (gaia.context_menus) {
          gaia.context_menus.set(contextMenuData.data.name, contextMenuData);
        }
      }
    }
  }
  


  // Declare buttons
  gaia.logger.info("Declaring button interactions...");
  const buttonFiles = [
    {
      dir: "",
      files: fs
        .readdirSync(path.join(__dirname, "/buttons"))
        .filter(isCommandFile),
    },
  ];
  for (const packageString of PACKAGES) {
    const packageFile = path.join(__dirname, "/buttons", packageString);
    if (fs.existsSync(packageFile)) {
      buttonFiles.push({
        dir: packageString,
        files: fs.readdirSync(packageFile).filter(isCommandFile),
      });
    }
  }
  for (const packageFile of buttonFiles) {
    for (const file of packageFile.files) {
      const fileRequire = await import(`./buttons/${packageFile.dir}/${file}`);
      const buttonData = fileRequire.default;
      if (gaia.buttons) {
        gaia.buttons.set(buttonData.name, buttonData);
      }
    }
  }
  gaia.logger.info(`Refreshed ${gaia.buttons.size} buttons.`);

  // Declare select menus
  gaia.logger.info("-> Declaring select menu interactions...");
  const selectMenuFiles = [
    {
      dir: "",
      files: fs
        .readdirSync(path.join(__dirname, "/menus"))
        .filter(isCommandFile),
    },
  ];
  for (const packageString of PACKAGES) {
    const packageFile = path.join(__dirname, "/menus", packageString);
    if (fs.existsSync(packageFile)) {
      selectMenuFiles.push({
        dir: packageString,
        files: fs.readdirSync(packageFile).filter(isCommandFile),
      });
    }
  }
  for (const packageFile of selectMenuFiles) {
    for (const file of packageFile.files) {
      const fileRequire = await import(`./menus/${packageFile.dir}/${file}`);
      const selectMenuData = fileRequire.default;
      if (gaia.select_menus) {
        gaia.select_menus.set(selectMenuData.name, selectMenuData);
      }
    }
  }
  gaia.logger.info(`Refreshed ${gaia.select_menus.size} select menus.`);

  // Declare modals
  gaia.logger.info("Declaring modal interactions...");
  const modalFiles = [
    {
      dir: "",
      files: fs
        .readdirSync(path.join(__dirname, "/modals"))
        .filter(isCommandFile),
    },
  ];
  for (const packageString of PACKAGES) {
    const packageFile = path.join(__dirname, "/modals", packageString);
    if (fs.existsSync(packageFile)) {
      modalFiles.push({
        dir: packageString,
        files: fs.readdirSync(packageFile).filter(isCommandFile),
      });
    }
  }
  for (const packageFile of modalFiles) {
    for (const file of packageFile.files) {
      const fileRequire = await import(`./modals/${packageFile.dir}/${file}`);
      const modalData = fileRequire.default;
      if (gaia.modals) {
        gaia.modals.set(modalData.name, modalData);
      }
    }
  }
  gaia.logger.info(`Refreshed ${gaia.modals.size} modals.`);
  */
}
