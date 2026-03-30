create table if not exists portal_inbox_mails (
  id uuid primary key default gen_random_uuid(),
  uid text unique not null,
  folder text not null default 'INBOX',
  from_name text,
  from_email text,
  to_email text,
  subject text,
  body_html text,
  body_text text,
  received_at timestamptz,
  is_read boolean not null default false,
  is_starred boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_inbox_mails_folder on portal_inbox_mails(folder);
create index if not exists idx_inbox_mails_received on portal_inbox_mails(received_at desc);
