import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      console.log(response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const responseData = await api.post("/repositories", {
        "title": `gostack-${Date.now()}`,
        "url": "https://github.com/Fernandoaml/gostack-template-conceitos-nodejs",
        "techs": ["Node.js", "JavaScript"]
    });
    const repository = responseData.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const responseData = await api.delete(`/repositories/${id}`);
    console.log(responseData);

    const repository = repositories.filter((repository) => repository.id !== id)
    // console.log(repositories)
    // console.log(repository)
    setRepositories(repository);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
