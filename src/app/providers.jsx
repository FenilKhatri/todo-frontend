import { AuthProvider } from "../features/auth/AuthContext";

function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
