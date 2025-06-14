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
    alert("O nome de usuário deve ter pelo menos 6 caracteres");
    return false;
  }
  
  // verifica se a password contém @ (seria para verificar se o e-mail
  // está em formato válido, no mundo real
  if (!uname.includes("@")) {
    alert("Digite um e-mail válido para o username!");
    return false;
  }
  return true;
}

export const checkPassword = (pword) => {
  // verifica o comprimento da password
  if (pword.length < 4) {
    alert("A senha deve ter pelo menos 4 caracteres");
    return false;
  }
  return true;
}
