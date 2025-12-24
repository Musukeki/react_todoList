export type InputGroupProps = {
  name: string;
  type: string;
  title: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Todo = {
  id: string;
  title: string;
  date: string;
  checked: boolean;
};

export type DialogProps = {
  open: boolean;
  close: () => void;
  onDelete: () => void;
};
