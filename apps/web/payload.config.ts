import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor(),
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  routes: {
    admin: "/cms",
    api: "/api/payload",
    graphQL: "/api/payload/graphql",
  },
  admin: {
    user: "users",
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        { name: "fullName", type: "text" },
        {
          name: "role",
          type: "select",
          defaultValue: "staff",
          options: ["staff", "admin"],
          required: true,
        },
      ],
    },
    {
      slug: "services",
      admin: { useAsTitle: "title" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true },
        { name: "summary", type: "textarea" },
        { name: "content", type: "richText" },
      ],
    },
    {
      slug: "projects",
      admin: { useAsTitle: "title" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true },
        { name: "location", type: "text" },
        { name: "year", type: "number" },
        { name: "servicesUsed", type: "text", hasMany: true },
        { name: "content", type: "richText" },
      ],
    },
    {
      slug: "posts",
      admin: { useAsTitle: "title" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true },
        { name: "excerpt", type: "textarea" },
        { name: "content", type: "richText" },
        { name: "publishedAt", type: "date" },
      ],
    },
    {
      slug: "faqs",
      admin: { useAsTitle: "question" },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      slug: "team",
      admin: { useAsTitle: "name" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "title", type: "text" },
        { name: "bio", type: "textarea" },
      ],
    },
    {
      slug: "siteSettings",
      fields: [
        { name: "businessName", type: "text" },
        { name: "phone", type: "text" },
        { name: "email", type: "text" },
        { name: "address", type: "textarea" },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  secret: process.env.PAYLOAD_SECRET ?? "dev-only-change-me",
});

