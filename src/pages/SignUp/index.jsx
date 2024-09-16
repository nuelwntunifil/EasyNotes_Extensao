import { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Container, Form, Background } from './styles';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const Navigate = useNavigate();

  function handleSignUp(){
    if(!name || !email || !password){
      alert("Preencha todos os campos!");
      return
    }

    api.post("/users", {name, email, password})
    .then(
      () => {
        alert("Usuário cadastrado com sucesso!");
        Navigate("/");
      }
    )
    .catch(
      error => {
        if(error.response){
          alert(error.response.data.message);
        } else{
          alert("Não foi possível cadastrar!");
        }
      }
    )
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>EasyNotes</h1>
        <p>A aplicação para salvar e gerenciar suas anotações.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>

    </Container>
  )
}