export const site = {
  name: "Prothymia",
  title: "Prothymia — To attend is to inhabit.",
  motto: "To attend is to inhabit.",
  email: "Prothymia@Prothymia.org",
  author: "Hollis H. Jiang",
  color: "#66023C",
  facebook: "https://www.facebook.com/share/1F1tJsuhfF/",
  instagram: "https://www.instagram.com/hollis.jiang?stkn=MW1wNTVscXl5c3ozbw==",
  bitcoin: "bc1qqs0max5tkja7tmm6xtkp4jhqccgvxe6cm7lu0s",
  usdc: "0xFc71525c448cD9a7DDA6995F2898a8cB7959763A",
} as const;

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://prothymia.org").replace(/\/$/, "");
}

export type StaticPage = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export const staticPages: Record<string, StaticPage> = {
  about: {
    eyebrow: "About Prothymia",
    title: "A place for sustained attention.",
    paragraphs: [
      "I built Prothymia as a quiet place for essays that reward attention rather than compete for it. The work ranges across history, science, politics, countries, culture, and the life of ideas.",
      "I write and publish here as Hollis H. Jiang. Prothymia is independent, noncommercial, and free to read. There are no public accounts, paywalls, advertisements, or marketing trackers.",
      "The name points toward willingness and attention: a disposition to meet the world carefully enough to inhabit it.",
    ],
  },
  contact: {
    eyebrow: "Contact Prothymia",
    title: "Correspondence is welcome.",
    paragraphs: [
      `For corrections, permissions, thoughtful responses, or other correspondence, write to ${site.email}.`,
      "Messages are read with care, but a reply cannot be guaranteed.",
    ],
  },
  support: {
    eyebrow: "Support Prothymia",
    title: "Support independent writing.",
    paragraphs: [
      "Prothymia is a noncommercial, independent project supported by its readers. Financial support helps sustain writing, editing, image licensing, and the continued operation of the site.",
      "Crypto contributions are optional. Public-blockchain transactions are generally irreversible, so confirm the asset, address, and network before sending.",
    ],
  },
  privacy: {
    eyebrow: "Privacy & Terms",
    title: "A short, plain account of data use.",
    paragraphs: [
      "Prothymia collects information you deliberately submit, such as an email address for the newsletter or credentials used for private access. The newsletter uses an email address only to send a confirmation and new-article notices.",
      "Prothymia does not run advertising, marketing trackers, or third-party analytics trackers. A light or dark appearance preference may be stored locally in your browser and is not used for tracking.",
      "Hosting and security infrastructure may process ordinary request data, including raw IP addresses, user-agent information, and timestamps, for delivery, aggregate traffic information, abuse prevention, and security. Raw IP addresses are not described as anonymous data.",
      "Unsubscribing removes the local subscriber record and its linked local delivery records. The email provider may retain its own delivery or security logs under its separate policies.",
      "Use of this site is at your own discretion. Articles are published for general reading and are not professional, legal, financial, or medical advice.",
    ],
  },
  copyright: {
    eyebrow: "Copyright",
    title: "Rights and permissions.",
    paragraphs: [
      "Unless otherwise stated, original articles and original images published on Prothymia are protected by copyright. Third-party images, quotations, and referenced works remain subject to their respective rights and licenses.",
      `For republication, translation, classroom use beyond ordinary fair use, or other permissions, contact ${site.email}.`,
    ],
  },
};
