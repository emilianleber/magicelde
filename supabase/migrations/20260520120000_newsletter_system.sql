-- Newsletter-System: Subscribers + Campaigns
-- Subscribers: alle Newsletter-Anmeldungen mit Unsubscribe-Token
-- Campaigns: Versendete Newsletter (Verlauf, Logging)

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  status text not null default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  source text, -- 'tickets-newsletter', 'blog-newsletter', 'buchung', 'chatbot', 'showplaner', 'manual'
  unsubscribe_token text not null unique default encode(gen_random_bytes(16), 'hex'),
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);
create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (lower(email));
create index if not exists newsletter_subscribers_unsubscribe_token_idx
  on public.newsletter_subscribers (unsubscribe_token);

-- Campaigns
create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body_html text,
  body_text text,
  status text not null default 'draft' check (status in ('draft', 'sending', 'sent', 'failed')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  recipient_count int not null default 0,
  failed_count int not null default 0,
  created_by text,
  error_log jsonb default '[]'::jsonb
);

create index if not exists newsletter_campaigns_status_idx
  on public.newsletter_campaigns (status);
create index if not exists newsletter_campaigns_created_at_idx
  on public.newsletter_campaigns (created_at desc);

-- RLS
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_campaigns enable row level security;

-- Admin (service-role) hat vollen Zugriff über Edge-Functions
-- Auth-Users brauchen wir hier nicht — Newsletter ist Service-Layer
create policy "service_role_all_subs" on public.newsletter_subscribers
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "service_role_all_camps" on public.newsletter_campaigns
  for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- Auth-User (Admin im Frontend) darf lesen
create policy "auth_read_subs" on public.newsletter_subscribers
  for select using (auth.role() = 'authenticated');
create policy "auth_read_camps" on public.newsletter_campaigns
  for select using (auth.role() = 'authenticated');
