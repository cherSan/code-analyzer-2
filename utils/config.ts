import { Config } from "@/types/config.types";

export const getConfig = () => {
  if (!process.env.NEXT_PUBLIC_CONFIG_JSON) throw new Error('No configuration found');
  return JSON.parse(process.env.NEXT_PUBLIC_CONFIG_JSON) as Config;
}