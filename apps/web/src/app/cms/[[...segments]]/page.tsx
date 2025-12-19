import type { ImportMap } from "payload";

import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

const configPromise = import("../../../../payload.config").then((m) => m.default);

// We have no custom component mappings yet; this can remain empty until we add them.
const importMap = {} as ImportMap;

type PageProps = {
  params: { segments?: string[] };
  searchParams: { [key: string]: string | string[] };
};

export default async function CMSPage({ params, searchParams }: PageProps) {
  const segments = params.segments ?? [];

  return RootPage({
    config: configPromise,
    importMap,
    params: Promise.resolve({ segments }),
    searchParams: Promise.resolve(searchParams),
  });
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  return generatePageMetadata({
    config: configPromise,
    params: Promise.resolve(params),
    searchParams: Promise.resolve(searchParams),
  });
}

