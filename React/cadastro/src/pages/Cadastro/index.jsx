import { Link } from "react-router-dom";
import { useRef } from "react";
import API from "../../services/api.js";

function Cadastro() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

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
          type="text"
          placeholder="Nome"
          ref={nameRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          ref={passwordRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
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
