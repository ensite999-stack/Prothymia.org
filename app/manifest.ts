import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.motto,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#5B0B63",
    icons: [{ src: "/icon.svg?v=5", sizes: "any", type: "image/svg+xml" }],
  };
}
