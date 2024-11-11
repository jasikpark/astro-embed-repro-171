import rss, { type RSSFeedItem } from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "src/site-config-vars";
import { getPublishableBlogEntries } from "./_getPublishableBlogEntries";

export async function GET(context: { site: string | URL }) {
  const posts = await getPublishableBlogEntries();
  return rss({
    // `<title>` field in output xml
    title: SITE_TITLE,
    // `<description>` field in output xml
    description: SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map(
      (post) =>
        ({
          title: post.data.title,
          pubDate: post.data.published,
          description: post.data.description,
          link: post.collection === "posts" ? `/${post.slug}/` : post.data.url,
        }) satisfies RSSFeedItem
    ),
    // (optional) inject custom xml
    customData: "<language>en-us</language>",
    stylesheet: "/rss/pretty-feed-v3.xsl",
  });
}
