export const site = {
  name: "Prothymia",
  title: "Prothymia — To attend is to inhabit.",
  motto: "To attend is to inhabit.",
  email: "Prothymia@Prothymia.org",
  author: "Hollis H. Jiang",
  color: "#702963",
  facebook: "https://www.facebook.com/share/1F1tJsuhfF/",
  instagram: "https://www.instagram.com/hollis.jiang?stkn=MW1wNTVscXl5c3ozbw==",
  bitcoin: "bc1qqs0max5tkja7tmm6xtkp4jhqccgvxe6cm7lu0s",
  usdc: "0xFc71525c448cD9a7DDA6995F2898a8cB7959763A",
} as const;

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://prothymia.org").replace(/\/$/, "");
}

export type StaticSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: Array<{ title?: string; text: string }>;
};

export type StaticPage = {
  eyebrow: string;
  title: string;
  intro: string[];
  sections?: StaticSection[];
};

export const staticPages: Record<string, StaticPage> = {
  about: {
    eyebrow: "About",
    title: "About Prothymia",
    intro: [
      "Prothymia is an independent nonprofit organization. The name draws on an ancient Greek idea of a willing and eager disposition toward action: a readiness to engage, respond, and take part.",
      "In an age of fragmented information and scarce attention, we choose a quieter path: careful observation, sustained thought, and an independent view of the relationship between people and the world.",
    ],
    sections: [
      {
        heading: "What we care about",
        paragraphs: ["Our work focuses on questions that shape human experience and the future:"],
        bullets: [
          { title: "Life and existence", text: "The conditions of individual life, spiritual difficulty, meaning, and the experience of being alive." },
          { title: "Philosophy", text: "Critical thought that examines assumptions, social blind spots, and the ideas by which people orient themselves." },
          { title: "Human rights and dignity", text: "The boundaries of rights, marginalized voices, and the dignity of the individual within social structures." },
          { title: "Environment and ecology", text: "The human imprint on the natural world and the ethical relationship between people and the planet." },
          { title: "Public life", text: "Institutions, social change, ethics, and the tension between collective systems and individual choice." },
        ],
      },
      {
        heading: "Our independence",
        paragraphs: [
          "As a noncommercial magazine, Prothymia does not allow commercial interests or traffic algorithms to determine its editorial direction. We do not chase every trend, manufacture panic, or optimize writing for empty attention.",
          "We believe independence is a condition of free thought. Prothymia is intended to be a place where readers can slow down, think carefully, and encounter writing that tries to make the world more intelligible.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    intro: [
      "Prothymia respects the privacy of its readers. As an independent, noncommercial organization, we collect only the information reasonably necessary to operate the site and provide the newsletter.",
    ],
    sections: [
      {
        heading: "1. Information we collect and use",
        paragraphs: ["We limit collection to information needed for basic site operation and reader-requested services:"],
        bullets: [
          { title: "Email address", text: "If you subscribe, we use your email address to send subscription confirmation, new-article notices, and necessary service messages. Prothymia does not sell or rent your email address and does not use it for advertising. Our email service provider necessarily processes the address in order to deliver mail." },
          { title: "Basic access data", text: "Hosting and security infrastructure may provide aggregate information such as page views, unique visitors, approximate country or city, and browser or operating-system categories. At the request level, infrastructure may also process technical data such as IP address, User-Agent, and timestamps. We do not use this information for cross-site tracking or user profiling." },
        ],
      },
      {
        heading: "2. Technologies we do not use",
        bullets: [
          { title: "No advertising or marketing tracking", text: "We do not use commercial ad systems, marketing automation trackers, or promotional tracking plug-ins." },
          { title: "No third-party cross-site tracking", text: "We do not use Meta Pixel, Google Analytics, cross-site tracking cookies, or similar commercial tracking SDKs." },
          { title: "No reader profiles", text: "We do not build behavioral or demographic profiles from your reading activity." },
        ],
      },
      {
        heading: "3. Storage and security",
        paragraphs: [
          "We use reasonable technical and administrative safeguards to protect the information submitted to us. Aggregate statistics are used to understand site operation and reach, not to identify individual readers. We do not describe raw infrastructure request data as anonymous when it may contain identifiers such as IP addresses.",
        ],
      },
      {
        heading: "4. Your choices",
        bullets: [
          { title: "Unsubscribe", text: "You can unsubscribe at any time using the link in a newsletter email. Unsubscribing deletes the local subscriber record and linked local delivery records. An email provider may retain necessary delivery or security logs under its own policies." },
          { title: "Access or deletion requests", text: "You may contact us to ask about or request deletion of the email address you submitted." },
        ],
      },
      {
        heading: "5. Updates and contact",
        paragraphs: [
          "We may revise this policy as the site or its services change. Updates will be published on this page.",
          `Questions or privacy requests may be sent to ${site.email}.`,
        ],
      },
    ],
  },
  copyright: {
    eyebrow: "Copyright",
    title: "Copyright Policy",
    intro: [
      "Prothymia respects the rights of creators and aims to maintain a clear, responsible environment for publishing and sharing original work. This policy applies to text, images, audio, video, and other material published through Prothymia.",
    ],
    sections: [
      {
        heading: "1. Original work",
        bullets: [
          { title: "Editorial work", text: "Unless otherwise stated, rights in work created independently by the Prothymia editorial team belong to Prothymia or the relevant rights holder." },
          { title: "Contributors", text: "A contributor retains full copyright in the contributor's original work published by Prothymia." },
        ],
      },
      {
        heading: "2. Contributor license",
        bullets: [
          { title: "Originality", text: "Contributors are responsible for ensuring that submitted work is original or properly licensed and does not infringe third-party copyright, trademark, privacy, or other rights." },
          { title: "License to Prothymia", text: "By submitting work for publication, a contributor grants Prothymia a nonexclusive, worldwide, royalty-free license to publish, distribute, display, format, edit, archive, and promote that work through Prothymia's official channels." },
        ],
      },
      {
        heading: "3. Third-party material",
        paragraphs: [
          "We aim to identify the source, author, or rights holder of third-party images, video, music, and other material when appropriate. If an attribution is missing or incorrect, a rights holder may contact us to request a correction.",
          "Third-party rights remain with their respective owners. Use of third-party material must rely on applicable law, permission, license terms, or fair-use principles. Noncommercial status alone does not remove copyright obligations.",
        ],
      },
      {
        heading: "4. Reuse and republication",
        bullets: [
          { text: "Commercial reproduction, republication, adaptation, or mirroring requires written permission from Prothymia or the relevant rights holder." },
          { text: "Noncommercial quotation or sharing should identify the author and Prothymia as the source and, when possible, link to the original publication. All use remains subject to applicable copyright law." },
        ],
      },
      {
        heading: "5. Copyright claims",
        paragraphs: [
          `If you believe material on this site infringes your rights, send relevant ownership information and the location of the material to ${site.email}. We will review the request and respond as appropriate.`,
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    intro: [
      "Prothymia welcomes thoughtful correspondence, submissions, copyright questions, and ideas from readers.",
    ],
    sections: [
      {
        heading: "Email",
        paragraphs: [
          `${site.email} — for general inquiries, article correspondence, copyright matters, and privacy requests.`,
        ],
      },
      {
        heading: "Submissions",
        paragraphs: [
          "To propose a piece for publication, send the manuscript or an outline to the address above. Use the subject line: [Submission] + proposed title + author name or byline.",
        ],
        bullets: [
          { title: "Subjects", text: "Life and existence, philosophy, human rights and dignity, environment and ecology, and public issues." },
          { title: "What to include", text: "Please submit original work and include a brief author biography and a reliable way to contact you. We aim to reply within seven business days." },
        ],
      },
    ],
  },
  support: {
    eyebrow: "Support",
    title: "Support independent writing.",
    intro: [
      "Prothymia is a noncommercial independent project supported by readers. Contributions help sustain writing, editing, image licensing, and the continuing operation of the site.",
      "Cryptocurrency contributions are voluntary and generally irreversible. Confirm the asset, address, and network before sending funds.",
    ],
    sections: [
      {
        heading: "Contribution routes",
        paragraphs: ["Use only a supported asset and network. Sending funds over the wrong network may result in permanent loss."],
      },
      {
        heading: "Thank you",
        paragraphs: ["We are grateful for every reader who chooses to support Prothymia."],
      },
    ],
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms of Use",
    intro: [
      "These terms describe the basic conditions for using Prothymia's website and services. By using the site, you agree to use it lawfully and in a way that does not interfere with other readers or the operation of the service.",
    ],
    sections: [
      {
        heading: "Use of the site",
        paragraphs: ["You may read, link to, and share Prothymia pages for lawful purposes. Automated abuse, attempts to disrupt the service, unauthorized access, and unlawful use are not permitted."],
      },
      {
        heading: "Editorial content",
        paragraphs: ["Prothymia publishes editorial and informational material. Content may contain interpretation, analysis, or opinion and is not a substitute for professional legal, medical, financial, or other individualized advice."],
      },
      {
        heading: "Intellectual property",
        paragraphs: ["Copyright and reuse are governed by the Copyright Policy and by any rights notices attached to individual works."],
      },
      {
        heading: "Availability and changes",
        paragraphs: ["We may change, suspend, or discontinue parts of the site and may update these terms as the service evolves. The current version will be published here."],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms may be sent to ${site.email}.`],
      },
    ],
  },
  policies: {
    eyebrow: "Policies",
    title: "Policies",
    intro: [
      "Prothymia's policies are intended to protect editorial independence, reader trust, creator rights, and the privacy of people who use the site.",
    ],
    sections: [
      {
        heading: "Editorial independence",
        paragraphs: ["Editorial decisions are made independently of commercial pressure, traffic incentives, and donor influence. Support for Prothymia does not purchase editorial control."],
      },
      {
        heading: "Corrections and updates",
        paragraphs: ["When a material factual error is identified, we aim to correct it promptly and preserve the integrity of the published record. Routine edits that do not change the substance of a piece may be made without a separate notice."],
      },
      {
        heading: "Submissions",
        paragraphs: ["Submitted work should be original, accurately attributed, and free of undisclosed rights conflicts. Acceptance, editing, scheduling, and publication remain editorial decisions."],
      },
      {
        heading: "Privacy and rights",
        paragraphs: ["Our Privacy Policy explains how reader information is handled. Our Copyright Policy explains ownership, contributor licensing, third-party material, and republication."],
      },
      {
        heading: "Contact",
        paragraphs: [`Policy questions may be sent to ${site.email}.`],
      },
    ],
  },
};
