import { getCollection } from "astro:content";
import { SHOULD_BUILD_DRAFT_AND_FUTURE } from "astro:env/server";

export const PAGE_SIZE = 23;

export async function getPublishableBlogEntries(onlyPosts = false) {
  const posts = await getCollection("posts", (entry) => {
    /** Show every post if we're in dev or if {@link SHOULD_BUILD_DRAFT_AND_FUTURE} is true. */
    if (import.meta.env.DEV || SHOULD_BUILD_DRAFT_AND_FUTURE) {
      return true;
    }
    return (
      // Hide posts from future days
      entry.data.published.valueOf() <= new Date().valueOf() &&
      // Hide draft posts
      !entry.data.isDraft
    );
  });

  const externalPosts = await getCollection("externalPosts", (entry) => {
    // Show every post if we're in dev.
    if (import.meta.env.DEV) {
      return true;
    }
    return (
      // Hide posts from future days
      entry.data.published.valueOf() <= new Date().valueOf() &&
      // Hide draft posts
      !entry.data.isDraft
    );
  });

  if (onlyPosts) {
    // Sort posts by date.
    const sortedPosts = [...posts].sort(
      (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
    );

    return sortedPosts;
  }

  // Sort posts by date.
  const sortedPosts = [...posts, ...externalPosts].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );

  return sortedPosts;
}
