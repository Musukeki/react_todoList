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

export type DialogDeleteProps = {
  open: boolean;
  close: () => void;
  onDelete: () => void;
};

export type DialogEditProps = {
  open: boolean;
  close: () => void;
  onEdit: (update: Todo) => void;
  value: Todo;
};
