import { GRAPHQL_PLAYGROUND_GET, GRAPHQL_POST } from "@payloadcms/next/routes";

const configPromise = import("../../../../../payload.config").then(
  (m) => m.default,
);

export const GET = GRAPHQL_PLAYGROUND_GET(configPromise);
export const POST = GRAPHQL_POST(configPromise);

export const dynamic = "force-dynamic";

