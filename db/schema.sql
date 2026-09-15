CREATE TABLE IF NOT EXISTS kvisl_articles (
  id bigserial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  dek text NOT NULL DEFAULT '',
  body_html text NOT NULL DEFAULT '',
  topic text NOT NULL DEFAULT 'General',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'deleted')),
  published_at timestamptz,
  featured boolean NOT NULL DEFAULT false,
  cover_url text,
  cover_alt text NOT NULL DEFAULT '',
  cover_credit text NOT NULL DEFAULT '',
  sources text NOT NULL DEFAULT '',
  announced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS kvisl_articles_public_idx
  ON kvisl_articles (status, published_at DESC)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS kvisl_articles_topic_idx
  ON kvisl_articles (topic, published_at DESC)
  WHERE status = 'published';

CREATE TABLE IF NOT EXISTS kvisl_subscribers (
  id bigserial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kvisl_newsletter_deliveries (
  id bigserial PRIMARY KEY,
  article_id bigint NOT NULL REFERENCES kvisl_articles(id) ON DELETE CASCADE,
  subscriber_id bigint NOT NULL REFERENCES kvisl_subscribers(id) ON DELETE CASCADE,
  provider_id text,
  sent_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_id, subscriber_id)
);
