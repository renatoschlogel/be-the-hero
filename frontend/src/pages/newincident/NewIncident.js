import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './NewIncident.css';


export default function NewIncident() {

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [value, setValue] = useState([]);

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Autorization: ongId,
        }
      });
      
      history.push('/profile');

    } catch (error) {
      alert('Falha ao Cadastrar Caso!')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>
          <h1>Cadastrar novo Caso</h1>
          <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar
          </Link>

        </section>
        
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título"
            value={title}
            onChange={e =>setTitle(e.target.value)}
          />
          
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e =>setDescription(e.target.value)}
          />
          
          <input 
            placeholder="Valor"
            value={value}
            onChange={e =>setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>

  );
}