export interface TextBoxSingleProps {
  name: string;
  callback?: null | ((value: string) => void);
  label: string;
  rules: Record<string, unknown>;
}
