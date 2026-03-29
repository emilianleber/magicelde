create table if not exists portal_mail_templates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  subject text,
  body text not null
);

create table if not exists portal_signature (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  updated_at timestamptz not null default now()
);
