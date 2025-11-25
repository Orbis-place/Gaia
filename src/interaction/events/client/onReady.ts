import { Gaia } from "@/bot";
export default function onReady(gaia: Gaia) {
  gaia.logger.info(
    `Logged in as ${gaia.user ? gaia.user.username : "Client Not Found"}!`
  );
}
