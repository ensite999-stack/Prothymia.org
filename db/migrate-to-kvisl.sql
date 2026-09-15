DO $$
DECLARE
  legacy_prefix text := 'pro' || 'thymia';
BEGIN
  IF to_regclass(legacy_prefix || '_articles') IS NOT NULL
     AND to_regclass('kvisl_articles') IS NULL THEN
    EXECUTE format('ALTER TABLE %I RENAME TO kvisl_articles', legacy_prefix || '_articles');
  END IF;

  IF to_regclass(legacy_prefix || '_subscribers') IS NOT NULL
     AND to_regclass('kvisl_subscribers') IS NULL THEN
    EXECUTE format('ALTER TABLE %I RENAME TO kvisl_subscribers', legacy_prefix || '_subscribers');
  END IF;

  IF to_regclass(legacy_prefix || '_newsletter_deliveries') IS NOT NULL
     AND to_regclass('kvisl_newsletter_deliveries') IS NULL THEN
    EXECUTE format('ALTER TABLE %I RENAME TO kvisl_newsletter_deliveries', legacy_prefix || '_newsletter_deliveries');
  END IF;

  IF to_regclass(legacy_prefix || '_articles_public_idx') IS NOT NULL
     AND to_regclass('kvisl_articles_public_idx') IS NULL THEN
    EXECUTE format('ALTER INDEX %I RENAME TO kvisl_articles_public_idx', legacy_prefix || '_articles_public_idx');
  END IF;

  IF to_regclass(legacy_prefix || '_articles_topic_idx') IS NOT NULL
     AND to_regclass('kvisl_articles_topic_idx') IS NULL THEN
    EXECUTE format('ALTER INDEX %I RENAME TO kvisl_articles_topic_idx', legacy_prefix || '_articles_topic_idx');
  END IF;
END $$;
