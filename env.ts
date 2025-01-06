import { config } from "dotenv";
import {
  cleanEnv,
  str,
  EnvError,
  EnvMissingError,
} from "envalid";

await config({ export: true });

/**
 * Custom reporter that DOES NOT call Deno.exit/process.exit.
 * It throws an error instead.
 */
function noExitReporter(opts: {
  errors: Record<string, EnvError | EnvMissingError>;
  env: Record<string, unknown>;
  output: Record<string, unknown>;
}) {
  const { errors } = opts;
  const errorList = Object.values(errors).filter(Boolean);

  if (errorList.length > 0) {
    // Throw an error with details
    throw new Error(
      "Invalid or missing environment variables:\n" +
        errorList.map((err) => `${err.name}: ${err.message}`).join("\n")
    );
  }
}

export default cleanEnv(
  Deno.env.toObject(),
  {
    BOT_TOKEN: str(),
    OWNERS:    str(),
    MONGO_URL: str(),
  },
  {
    reporter: noExitReporter, // <— override the default reporter
  }
);
