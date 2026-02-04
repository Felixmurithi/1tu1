import z from "zod";
import { OAUTH_PROVIDERS } from "../constants/auth";

export type OauthProvider = (typeof OAUTH_PROVIDERS)[number];
export const OauthProviderSchema = z.enum(OAUTH_PROVIDERS);
export type OauthProviderSchema = z.infer<typeof OauthProviderSchema>;
