import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import API from "../../services/api.js";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Validações
    if (
      !nome.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido!");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    // Enviar os dados para o servidor
    try {
      await API.post("/cadastro", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      alert("Usuário Cadastrado com Sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar o usuário!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cadastro
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          onChange={(event) => setNome(event.target.value)}
          type="text"
          placeholder="Nome"
          ref={nameRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Senha"
          ref={passwordRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          placeholder="Confirme a Senha"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          type="submit" // Define o botão como tipo "submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"
        >
          Cadastrar-se
        </button>
      </form>
      <Link
        className="text-blue-700 hover: underline mt-4 block text-center"
        to="/login"
      >
        Já tem cadastro? Faça login
      </Link>
    </div>
  );
}

export default Cadastro;
