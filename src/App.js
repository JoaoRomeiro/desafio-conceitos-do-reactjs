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
      url: `url ${Date.now()}`,
      title: `Repositório ${Date.now()}`,
      techs: [
        `tech ${Date.now()}`,
        `tech ${Date.now()}`
      ]
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(
      repository => repository.id != id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>);
        })}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
