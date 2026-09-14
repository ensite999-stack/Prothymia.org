export const site = {
  name: "Prothymia",
  title: "Prothymia — To attend is to inhabit.",
  motto: "To attend is to inhabit.",
  email: "Prothymia@Prothymia.org",
  author: "Hollis H. Jiang",
  color: "#1A3A6B",
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
    eyebrow: "关于 Prothymia",
    title: "关于 Prothymia",
    intro: [
      "Prothymia 是一个独立的非盈利组织。“Prothymia”一词源自古希腊语所表达的一种精神状态：主体面对某项行动、事业或他人时，表现出的积极、自愿而热切的行动倾向——一种乐意并准备主动投入的姿态。它代表着内在的炽热、回应世界的渴望与决意。",
      "在这个信息碎片化与注意力稀缺的时代，我们拒绝浮于表面的喧嚣，选择以沉静、深入且独特的视角，重新审视人与世界的关系。",
    ],
    sections: [
      {
        heading: "我们的关切",
        paragraphs: ["我们聚焦于重塑人类经验与未来的核心议题，通过深度撰稿、哲学思考与社会观察，探寻深刻的公共价值："],
        bullets: [
          { title: "人生与存在", text: "探索个体的生命状态、精神困境与意义建构，记录真实而具体的活着。" },
          { title: "哲学思考", text: "以批判性的思辨拆解当代社会的盲点，提供超越时代阵痛的理性坐标。" },
          { title: "人权与尊严", text: "关注边缘化的声音与权利的边界，捍卫个体在社会结构中的基本尊严。" },
          { title: "环境与生态", text: "审视人类活动对自然的深刻烙印，思考人与地球如何建立长久且正义的伦理关系。" },
          { title: "公共议题", text: "追踪复杂的社会变革，记录制度、伦理与个人选择之间的交织与张力。" },
        ],
      },
      {
        heading: "我们的独立姿态",
        paragraphs: [
          "作为一家非商业杂志，Prothymia 不接受资本的控制与流量算法的驱使。我们不追踪即时热点，不制造情绪恐慌，亦不投合无意义的媚俗。我们相信，独立性是思想自由的前提，唯有摆脱商业利益的束缚，文字才能保持其应有的纯粹、敏锐与力量。",
          "我们希望 Prothymia 能成为一个供读者停下脚步、深度思考的庇护所——在这里，每一个思考都被尊重，每一篇文字都试图为理解这个复杂的世界提供新的可能。",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "隐私政策",
    title: "隐私政策",
    intro: [
      "Prothymia（以下简称“我们”）高度重视并尊重您的个人隐私。作为一个独立的非商业组织，我们相信思想的自由表达与阅读的独立性离不开对隐私的认真保护。本隐私政策旨在透明说明我们如何收集、使用和保护信息。",
    ],
    sections: [
      {
        heading: "1. 信息收集与使用",
        paragraphs: ["我们仅收集维持网站基础运行与提供内容订阅服务所必需的最少数据："],
        bullets: [
          { title: "电子邮件地址（订阅服务）", text: "当您主动订阅 Prothymia 时，我们会收集您的电子邮箱地址，用于发送订阅确认、新文章通知或必要的网站服务通知。Prothymia 不出售或出租您的邮箱，也不将其用于广告营销。为完成邮件发送，邮件服务提供商会按其服务职责处理该邮箱。" },
          { title: "基础访问数据（网站分析与安全）", text: "为了了解内容影响和维持网站安全，我们可能使用托管基础设施提供的汇总统计，例如页面访问量（PV / UV）、粗略的国家或城市级地区，以及浏览器或操作系统等设备类别。托管和安全基础设施在请求层面也可能处理原始 IP 地址、User-Agent、时间戳等技术数据；这些数据不被用于跨站追踪或用户画像。" },
        ],
      },
      {
        heading: "2. 坚决不使用的技术",
        bullets: [
          { title: "无营销工具", text: "我们不使用商业广告系统、营销自动化追踪或第三方推广插件。" },
          { title: "无第三方追踪", text: "我们不植入跨站追踪 Cookie、社交平台追踪像素（如 Meta Pixel）或大型商业分析 SDK（如 Google Analytics）。" },
          { title: "无用户画像", text: "我们不对您的阅读偏好、行为习惯或个人特征进行分析、建模或画像构建。" },
        ],
      },
      {
        heading: "3. 数据存储与安全",
        paragraphs: [
          "我们采取合理且必要的技术与管理措施，保护您提交的邮箱地址免受未经授权的访问、泄露、篡改或毁损。汇总统计仅用于理解网站使用情况与维护服务，不用于识别具体个人；我们不会把基础设施可能处理的原始请求数据描述为匿名数据。",
        ],
      },
      {
        heading: "4. 您的权利",
        bullets: [
          { title: "退订权利", text: "您可以随时通过订阅邮件底部的退订链接取消订阅。退订后，我们会删除本地订阅者记录及可关联的本地投递记录；邮件服务提供商可能依据其独立政策保留必要的投递或安全日志。" },
          { title: "信息查询与删除", text: "如需查询或删除您提交的邮箱信息，可随时与我们联系。" },
        ],
      },
      {
        heading: "5. 政策更新与联系方式",
        paragraphs: [
          "我们可能会根据网站功能变化适时修订本隐私政策。任何更新都将在本页面发布。",
          `如对本隐私政策有疑问、意见或隐私相关请求，请联系 ${site.email}。`,
        ],
      },
    ],
  },
  copyright: {
    eyebrow: "版权",
    title: "Prothymia 版权声明与政策",
    intro: [
      "Prothymia 致力于保护创作者的知识产权，并构建一个尊重原创、清晰透明的传播环境。本版权政策适用于 Prothymia 网站及关联平台发布的文字、图像、音频、视频及其他形式的内容。",
    ],
    sections: [
      {
        heading: "1. 原创内容版权归属",
        bullets: [
          { title: "编辑部创作", text: "由 Prothymia 编辑部独立创作或制作的文章、音视频及其他多媒体作品，其版权及相关权利归 Prothymia 及其相关权利主体所有，另有说明的除外。" },
          { title: "投稿作者权益", text: "投稿作者对其创作并发布在 Prothymia 上的文章及原创内容保持完整的版权所有权。Prothymia 尊重创作者的精神权利与财产权利。" },
        ],
      },
      {
        heading: "2. 投稿与授权条款",
        bullets: [
          { title: "原创性保证", text: "投稿作者在向 Prothymia 提交作品时，应确保作品为原创，并未侵犯任何第三方的著作权、商标权、隐私权或其他合法权益。因投稿内容引起的版权纠纷，由投稿作者依法承担相应责任。" },
          { title: "传播授权", text: "投稿作者同意授予 Prothymia 一项非独占的、全球范围内免费的使用许可，允许 Prothymia 在其线上网站、期刊及官方传播渠道对作品进行分发、传播、展示、编排及推广。" },
        ],
      },
      {
        heading: "3. 第三方素材及引用说明",
        paragraphs: [
          "Prothymia 力求对文章及音像内容中使用的第三方图片、视频、音乐等标明来源、作者或出处；如有遗漏，欢迎权利人联系我们更正。",
          "第三方素材的版权归各自权利主体所有。对第三方材料的引用或使用应以适用法律、许可条件或合理使用原则为依据；非商业属性本身并不自动免除版权义务。",
        ],
      },
      {
        heading: "4. 转载与使用规范",
        bullets: [
          { text: "未经 Prothymia 或相关原创权利人的明确书面许可，任何个人、媒体或机构不得出于商业目的复制、转载、摘编或建立镜像。" },
          { text: "非商业性质的引用或分享，应注明原作者姓名及出处（Prothymia），并尽可能保留指向原始文章的链接；具体使用仍须遵守适用版权规则。" },
        ],
      },
      {
        heading: "5. 版权申诉与联系方式",
        paragraphs: [
          `如您认为本网站刊载的内容侵犯了您的合法版权，或对引用标注有疑问，请提供相关权属信息并联系 ${site.email}。我们将在核实后及时处理。`,
        ],
      },
    ],
  },
  contact: {
    eyebrow: "联系 Prothymia",
    title: "联系我们",
    intro: [
      "Prothymia 始终保持开放与连结。无论是深度探讨、投稿交流、版权建议，还是单纯与我们分享您的思考，都欢迎与我们取得联系。",
    ],
    sections: [
      {
        heading: "1. 电子邮箱",
        paragraphs: [
          `${site.email}（适用于日常咨询、文章交流、版权与隐私事务）`,
        ],
      },
      {
        heading: "2. 投稿须知",
        paragraphs: [
          "如果您希望在 Prothymia 发表作品，请将稿件或大纲发送至上述邮箱，并在邮件主题中注明【投稿】+ 拟定文章题目 + 创作者姓名/署名。",
        ],
        bullets: [
          { title: "关注主题", text: "人生与存在、哲学思考、人权与尊严、环境与生态、公共议题。" },
          { title: "稿件要求", text: "请确保作品为原创，并附上简短的作者简介及联系方式。我们会在收到邮件后的 7 个工作日内给予回复。" },
        ],
      },
      {
        heading: "",
        paragraphs: ["我们期待听到来自每一个独特个体的声音。如果您有任何想法或建议，随时发送邮件即可。"],
      },
    ],
  },
  support: {
    eyebrow: "支持与捐赠",
    title: "支持独立写作。",
    intro: [
      "Prothymia 是一个非商业性的独立项目，由读者支持。经济支持有助于维持写作、编辑、图片授权以及网站的持续运营。",
      "加密货币捐赠完全自愿。公共区块链交易通常不可逆，因此请在发送前确认资产、地址和网络。",
    ],
    sections: [
      {
        heading: "捐赠通道",
        paragraphs: ["建议优先使用明确支持的网络与资产。使用错误的网络汇款可能导致资金永久丢失。"],
      },
      {
        heading: "",
        paragraphs: ["衷心感谢大家的支持。"],
      },
    ],
  },
};
