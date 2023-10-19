import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface IAuthContextData {
  user: IUserData | null;
  signed: boolean;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthProvider {
  children: ReactNode;
}

interface IUserData {
  id: string;
  email: string;
  name: string;
  age: number;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    setUser({
      age: 20,
      email: "chico@gmail.com",
      id: "dadwa2-d-2da",
      name: "Luis",
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
