import { NewsletterForm } from "../../components/newsletter-form";

export default function NewsletterPage() {
  return (
    <section className="section">
      <div className="narrow">
        <p className="eyebrow">Newsletter</p>
        <h1 className="page-title">New essays, and nothing else.</h1>
        <p className="standfirst">You will receive one confirmation email when you subscribe, then one email whenever a new article is first published. Updates to existing articles do not trigger another email.</p>
        <NewsletterForm />
      </div>
    </section>
  );
}
