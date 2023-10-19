import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { firebaseApp } from "../services/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

interface IAuthContextData {
  user: IUserData | null;
  signed: boolean;
  loading: boolean;
  handleSignUp: (
    email: string,
    password: string,
    name: string,
    age: number
  ) => void;
  handleLogin: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthProvider {
  children: ReactNode;
}

interface IUserData {
  uid: string;
  email: string;
  name: string;
  age: number;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("helpertism-user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function handleLogin(email: string, password: string) {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const db = getFirestore(firebaseApp);
      const usersCollection = collection(db, "users");
      const userDoc = doc(usersCollection, userCredential.user.uid);

      try {
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const user: IUserData = {
            name: userSnapshot.data().name,
            age: userSnapshot.data().age,
            email: userSnapshot.data().email,
            uid: userCredential.user.uid,
          };

          setUser(user);
          storageUser(user);
        } else {
          alert("Usuário não encontrado!");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Erro ao obter dados do usuário:", error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      alert("E-mail ou senha não conferem!");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(
    email: string,
    password: string,
    name: string,
    age: number
  ) {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const db = getFirestore(firebaseApp);
      const usersCollection = collection(db, "users");

      const userDoc = doc(usersCollection, userCredential.user.uid);

      const data = {
        uid: userCredential.user.uid,
        email,
        name,
        password,
        age,
      };

      await setDoc(userDoc, data)
        .then(() => {
          setUser(data);
          storageUser(data);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });

      console.log("Usuário cadastrado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("E-mail já está em uso!");
      } else if (error.code === "auth/invalid-email") {
        alert("Email inválido!");
      }
    } finally {
      setLoading(false);
    }
  }

  function storageUser(data: IUserData) {
    localStorage.setItem("helpertism-user", JSON.stringify(data));
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("helpertism-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        loading,
        handleLogin,
        handleSignUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
