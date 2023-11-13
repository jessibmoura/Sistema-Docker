import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText1, setInputText1] = useState(''); 
  const [inputText2, setInputText2] = useState('');
  const [inputText3, setInputText3] = useState('');
  const [inputText4, setInputText4] = useState('');
  const [inputText5, setInputText5] = useState('');

  const input_bd1 = (event) => {
    setInputText1(event.target.value); 
  };

  const remove_bd1 = (event) => {
    setInputText2(event.target.value); 
  };

  const input_bd2 = (event) => {
    setInputText3(event.target.value); 
  };

  const remove_bd2 = (event) => {
    setInputText4(event.target.value); 
  };

  const handleNameChange = (event) => {
    setInputText5(event.target.value);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3333/api/receber-valor-b1', { valor: inputText1 })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada à API:', error);
      });
  };

  const handleRemove = () => {
    axios.post('http://localhost:3333/api/remover-valor-b1', { valor: inputText2 })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada à API:', error);
      });
  };

  const handleSubmit2 = () => {
    axios.post('http://localhost:3333/api/receber-valor-b2', { valor: inputText3 })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada à API:', error);
      });
  };

  const handleRemove2 = () => {
    axios.post('http://localhost:3333/api/remover-valor-b2', { valor: inputText4 })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada à API:', error);
      });
  };

  const checkName = () => {
    axios.post('http://localhost:3333/api/verificar-nome', { nome: inputText5 })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        // A mensagem pode ser "O {nome} está presente nas duas tabelas!" ou "O {nome} não está presente nas duas tabelas!"
      })
      .catch((error) => {
        console.error('Erro ao fazer a chamada à API:', error);
      });
  };
  

  return (
    <div>
      <h1>Meu trabalho de SD</h1>

      <div id="container_db1">
      <input
        className="inp1"
        type="text"
        value={inputText1}
        onChange={input_bd1}
        placeholder="Insira algo no BD1..."
      />
      <button className="btn1" onClick={handleSubmit}>Inserir no BD1</button>

      <input
        className="inp2"
        type="text"
        value={inputText2}
        onChange={remove_bd1}
        placeholder="Remova algo no BD1..."
      />
      <button className="btn2" onClick={handleRemove}>Remover do BD1</button> 
      </div>

      <div id="container_db2">
      <input
        className="inp1"
        type="text"
        value={inputText3}
        onChange={input_bd2}
        placeholder="Insira algo no BD2..."
      />
      <button className="btn3" onClick={handleSubmit2}>Inserir no BD2</button>

      <input
        className="inp2"
        type="text"
        value={inputText4}
        onChange={remove_bd2}
        placeholder="Remova algo no BD2..."
      />
      <button className="btn4" onClick={handleRemove2}>Remover do BD2</button> 
      </div>

      <div id="container3">
      <input
        className="inp3"
        type="text"
        value={inputText5}
        onChange={handleNameChange}
        placeholder="Digite um nome para verificar nas duas tabelas..."
      />
      <button className="btn5" onClick={checkName}>Verificar nas duas tabelas</button>

      </div>

      

    </div>
  );
}

export default App;
