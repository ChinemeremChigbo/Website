type TypedActionReturnType = { type: string; payload?: any };

export function typedAction(type: string, payload?: any): TypedActionReturnType {
  return { type, payload };
}

export type Picture = {
  id?: string;
  msg?: string;
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};
