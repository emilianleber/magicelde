-- Add billing address fields to portal_customers
alter table portal_customers
  add column if not exists rechnungs_strasse text,
  add column if not exists rechnungs_plz text,
  add column if not exists rechnungs_ort text,
  add column if not exists rechnungs_land text default 'Deutschland';
