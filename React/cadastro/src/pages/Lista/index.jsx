import API from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListarUsuarios() {
  const [allUser, setAllUser] = useState();

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");

      const {
        data: { user },
      } = await API.get("/listar-usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllUser(user);
    }

    loadUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Lista de Usuários
      </h2>
      <ul className="space-y-2">
        {allUser &&
          allUser.length > 0 &&
          allUser.map((user) => (
            <li className="bg-gray-100 p-4 rounded-md" key={user.id}>
              <p className="font-semibold">ID: {user.id}</p>
              <p className="font-semibold">NOME: {user.name}</p>
              <p className="font-semibold">EMAIL: {user.email}</p>
            </li>
          ))}
        <button className="bg-blue-500 p-3 rounded-md text-white font-semibold hover:bg-blue-400">
          <Link to="/">Voltar</Link>
        </button>
      </ul>
    </div>
  );
}

export default ListarUsuarios;
