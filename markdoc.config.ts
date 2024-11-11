// markdoc.config.mjs
import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    fence: {
      attributes: { ...nodes.fence.attributes, title: { type: String, render: "title" } },
      render: component("./src/components/Code.astro"),
    },
    link: {
      ...nodes.link, // Apply Markdoc's defaults for other options
      render: component("./src/components/Link.astro"),
    },
  },
  tags: {
    youtube: {
      render: component("astro-embed", "YouTube"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        title: { type: String, required: true },
        id: { type: String, required: true },
        poster: { type: String, required: false },
        param: { type: String, required: false },
        playlabel: { type: String, required: false },
      },
    },
    embed: {
      render: component("./src/components/Embed.astro"),
      attributes: {
        title: { type: String, required: true },
        loading: {
          type: String,
          default: "lazy",
          matches: ["eager", "lazy"],
          errorLevel: "critical",
        },
        iframe: { type: String, required: true },
      },
    },
    linkpreview: {
      render: component("astro-embed", "LinkPreview"),
      attributes: {
        id: { type: String, required: true },
        hideMedia: { type: Boolean, required: false, default: false },
      },
    },
    fullbleed: {
      render: component("./src/components/FullBleed.astro"),
    },
    blueskypost: {
      render: component("astro-embed", "BlueskyPost"),
      attributes: {
        id: { type: String, required: true },
      },
    },
  },
});
