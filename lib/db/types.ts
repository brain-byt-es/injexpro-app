export type ProcedureRow = {
  id: string;
  name: string;
  area: string;
  type: string; // USER-DEFINED enum → treat as string for now
  description: string | null;
  slug: string | null;
  created_at: string | null;
};

export type MuscleRow = {
  id: string;
  name: string;
  function: string | null;
  slug: string | null;
  anatomical_region: string | null;
  created_at: string;
};
