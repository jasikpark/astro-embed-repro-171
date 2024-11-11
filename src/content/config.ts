// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const postCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.date(),
      isDraft: z.boolean().optional(),
      ogImage: z
        .discriminatedUnion("discriminant", [
          z.object({
            discriminant: z.literal(true),
            value: z.object({
              ogImageSrc: image(),
              ogImageAlt: z.string(),
            }),
          }),
          z.object({
            discriminant: z.literal(false),
          }),
        ])
        .optional(),
    }),
});

const externalPostCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.date(),
      isDraft: z.boolean().optional(),
      url: z.string().url(),
      ogImage: z
        .object({
          ogImageSrc: image(),
          ogImageAlt: z.string(),
        })
        .optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postCollection,
  externalPosts: externalPostCollection,
};
