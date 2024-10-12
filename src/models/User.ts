export interface IUser {
  id: number;
  name: string;
}

function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'number' &&
    'name' in arg &&
    typeof arg.name === 'string'
  );
}

export default {
  is: isUser,
} as const;
