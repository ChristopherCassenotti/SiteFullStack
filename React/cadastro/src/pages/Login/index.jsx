import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import API from "../../services/api.js";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data: token } = await API.post("/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("token", token);

      navigate("/listar-usuarios");
    } catch (err) {
      console.error(err);
      alert("Email ou Senha incorretos!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <Link
        className="text-blue-700 hover: underline mt-4 block text-center"
        to="/"
      >
        Não tem uma conta? Faça o cadastro
      </Link>
    </div>
  );
}

export default Login;
