import { config } from "dotenv";
import { cleanEnv, str } from "https://deno.land/x/envalid@0.1.2/envalid.ts";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  OWNERS: str(),
  MONGO_URL: str(),
});
