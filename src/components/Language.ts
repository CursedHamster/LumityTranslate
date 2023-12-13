export interface Language {
  id: number;
  type: "standard" | "lumity";
  name?: string;
  alphabet: string[];
  source?: string;
}
