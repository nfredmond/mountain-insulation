import type { ImportMap } from "payload";

import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

const configPromise = import("../../../../payload.config").then((m) => m.default);

// We have no custom component mappings yet; this can remain empty until we add them.
const importMap = {} as ImportMap;

type PageProps = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export default async function CMSPage({ params, searchParams }: PageProps) {
  const { segments = [] } = await params;
  const resolvedSearchParams = await searchParams;

  return RootPage({
    config: configPromise,
    importMap,
    params: Promise.resolve({ segments }),
    searchParams: Promise.resolve(resolvedSearchParams),
  });
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  return generatePageMetadata({
    config: configPromise,
    params: params,
    searchParams: Promise.resolve(resolvedSearchParams),
  });
}

