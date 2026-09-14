import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section"><div className="narrow"><p className="eyebrow">404</p><h1 className="page-title">This page is not here.</h1><p className="standfirst">The address may have changed, or the page may no longer exist.</p><p style={{ marginTop: "2rem" }}><Link className="button" href="/">Return home</Link></p></div></section>
  );
}
