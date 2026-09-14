import { notFound } from "next/navigation";
import { site, staticPages } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(staticPages).map((page) => ({ page }));
}

export default async function StaticPageRoute({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const content = staticPages[page];
  if (!content) notFound();

  return (
    <section className="section" lang="zh-CN">
      <div className="narrow">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
        <div className="static-copy">
          {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {content.sections?.map((section, index) => (
            <section className="static-section" key={`${section.heading}-${index}`}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length ? (
                <ul className="static-list">
                  {section.bullets.map((item, itemIndex) => (
                    <li key={`${item.title || "item"}-${itemIndex}`}>
                      {item.title ? <strong>{item.title}：</strong> : null}{item.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {page === "contact" ? (
          <p><a className="text-link" href={`mailto:${site.email}`}>{site.email}</a></p>
        ) : null}

        {page === "support" ? (
          <div className="donation-grid">
            <div className="donation-box">
              <strong>比特币 (BTC)</strong>
              <code>{site.bitcoin}</code>
            </div>
            <div className="donation-box">
              <strong>稳定币 / 以太坊 (EVM) 统一地址</strong>
              <code>{site.usdc}</code>
              <p>建议使用 Base 或 Arbitrum One。发送前请确认资产与网络；使用错误网络可能导致资金永久丢失。</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
