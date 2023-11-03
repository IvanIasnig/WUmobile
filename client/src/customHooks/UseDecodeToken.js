import { jwtDecode } from "jwt-decode";

const useDecodeToken = (authToken) => {
  if (!authToken) return null;

  try {
    const decoded = jwtDecode(authToken);
    console.log(decoded.sub);

    return decoded.sub;
  } catch (err) {
    console.error("Errore durante la codifica ", err);
    return null;
  }
};

export default useDecodeToken;
