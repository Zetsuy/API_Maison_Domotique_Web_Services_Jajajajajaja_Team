import argon2 from "argon2";

// Fonction permettant de hasher le mot de passe
export function argon2Hash(password: string) {

    try {
        return argon2.hash(password);
      } catch {
        throw new Error("argon2 error hash");
      }
}

// Fonction permettant de verifier le mot de passe en entree
export function argon2Verify(userPassword: string, password: string) {
    
    try {
        return argon2.verify(userPassword, password);
      } catch {
        throw new Error("argon2 error verify");
      }
}