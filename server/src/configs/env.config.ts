const ENV_CONFIG = {
  BACKEND_PORT: Bun.env.PORT,
  ENCRYPTION_SECRET: Bun.env.ENCRYPTION_SECRET ?? "utf8",
  IV_HEX_STRING: Bun.env.IV_HEX_STRING ?? "hex",
  JWT_SECRET: Bun.env.JWT_SECRET || "",
  JWT_REFRESH_TOKEN_EXPIRY: Bun.env.JWT_REFRESH_TOKEN_EXPIRY || "30d",
  JWT_ACCESS_TOKEN_EXPIRY: Bun.env.JWT_ACCESS_TOKEN_EXPIRY || "7d",
};

export default ENV_CONFIG;
