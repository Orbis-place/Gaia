import { Gaia } from "./bot";
import "module-alias/register";

let bot = null;
try {
  bot = new Gaia();
} catch (e) {
  console.error("An error occurred in the bot process.");
  console.error(e);
}

export default bot as Gaia;
