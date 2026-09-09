-- Profiles-Tabelle: eine Zeile pro registriertem Nutzer, automatisch
-- befüllt bei jeder neuen Registrierung über auth.users.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Nutzer sehen ihr eigenes Profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Nutzer aktualisieren ihr eigenes Profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger-Funktion: legt bei jeder neuen Registrierung automatisch
-- eine passende profiles-Zeile an.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
