export default interface ICreateUserProviderAccountDTO {
  account_type_id: number;
  user: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}
