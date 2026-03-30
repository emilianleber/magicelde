create table if not exists portal_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_id uuid references portal_customers(id) on delete set null,
  request_id uuid references portal_requests(id) on delete set null,
  event_id uuid references portal_events(id) on delete set null,
  subject text not null,
  body text not null,
  from_email text not null,
  to_email text not null,
  status text not null default 'sent',
  read_by_customer boolean not null default false
);
