import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  /**
   * Obtém a lista de repositorios
   */
  function getRespositories() {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }

  useEffect(() => {
    getRespositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: `url ${Date.now()}`,
      techs: [
        `tech ${Date.now()}`,
        `tech ${Date.now()}`
      ]
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    // Obtém novamente a lista de repositórios
    getRespositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>);
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
