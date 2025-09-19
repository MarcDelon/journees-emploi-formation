-- Ajouter une contrainte unique sur le numéro de téléphone pour empêcher les inscriptions multiples
alter table public.registrations add constraint unique_telephone unique (telephone);
