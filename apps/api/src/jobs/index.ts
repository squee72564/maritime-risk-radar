export type JobRegistration = {
  name: string;
  enabled: boolean;
};

export const plannedJobs: JobRegistration[] = [
  { name: "gdelt-ingestion", enabled: false },
  { name: "acled-ingestion", enabled: false },
];
