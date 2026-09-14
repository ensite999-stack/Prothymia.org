import { UnsubscribeForm } from "../../../components/unsubscribe-form";

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const token = one(params.token);
  return (
    <section className="section">
      <div className="narrow">
        <p className="eyebrow">Newsletter</p>
        <h1 className="page-title">Unsubscribe from Prothymia.</h1>
        <p className="standfirst">Confirm below. Your local subscriber record and linked local delivery records will be deleted.</p>
        {token ? <UnsubscribeForm token={token} /> : <p className="notice">This unsubscribe link is incomplete.</p>}
      </div>
    </section>
  );
}
