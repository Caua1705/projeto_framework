import { notify } from "./notify";

export const formatUsername = (uname) => {
  let name;
  // retira todos os espaços em branco
  name = uname.replace(" ", "");
  // converte caracteres em minúsculas
  name = uname.toLowerCase();
  return name;
}

export const checkUsername = (uname) => {
  // verifica comprimento do username
  if (uname.length < 6) {
    notify.warning("O nome de usuário deve ter pelo menos 6 caracteres");
    return false;
  }
  
  // verifica se o username contém @ 
  // seria para verificar se o e-mail está em formato válido, no mundo real
  if (!uname.includes("@")) {
    notify.warning("Digite um e-mail válido para o username!");
    return false;
  }
  return true;
}

export const checkPassword = (pword) => {
  // verifica o comprimento da password
  if (pword.length < 4) {
    notify.warning("A senha deve ter pelo menos 4 caracteres");
    return false;
  }
  return true;
}
