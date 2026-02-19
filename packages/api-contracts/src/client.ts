import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import * as SuperJSON from "superjson";
import type { AppRouter } from "@manifest/api-contracts";

// Safe SuperJSON import for React Native / Metro environment
// @ts-ignore
const transformer = SuperJSON.default || SuperJSON;

if (!transformer) {
  console.error(
    "CRITICAL ERROR: SuperJSON transformer is undefined in api-contracts client!",
  );
}

export const createApiClient = (config: {
  apiUrl: string;
  getToken?: () => Promise<string | null>;
  transformer?: any;
}) => {
  const authHeader = async () => {
    const token = await config.getToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getLinks = (url: string) => [
    loggerLink({
      enabled: () => true,
      logger: (opts) => {
        if (opts.direction === "up") {
          console.log(
            `[NETWORK] [${opts.type.toUpperCase()}] ${opts.path} \nURL: ${url}/trpc/${opts.path}`,
            JSON.stringify(opts.input, null, 2),
          );
        } else {
          console.log(
            `[NETWORK] [${opts.type.toUpperCase()}] RESPONSE ${opts.path} \nURL: ${url}/trpc/${opts.path}`,
            opts.result,
          );
        }
      },
    }),
    httpBatchLink({
      url: `${url}/trpc`,
      headers: authHeader,
      transformer: config.transformer || transformer,
    }),
  ];

  const client = createTRPCProxyClient<AppRouter>({
    links: getLinks(config.apiUrl),
    transformer: config.transformer || transformer,
  });

  return client;
};

export type ApiClient = ReturnType<typeof createApiClient>;
