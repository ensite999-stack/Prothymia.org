import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.motto,
    start_url: "/",
    display: "standalone",
    background_color: "#0D1117",
    theme_color: "#0D1117",
    icons: [{ src: "/icon.svg?v=9", sizes: "any", type: "image/svg+xml" }],
  };
}
