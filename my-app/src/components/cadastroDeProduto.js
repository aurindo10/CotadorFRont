import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components'
import BasicTable from './productList';
import img from '../components/LOGO_BLACK.jpeg'



const Logo = styled.img`
width: 250px;
display: flex;
padding-bottom: 40px;
padding-left: 225px;

`
export const UserContext = React.createContext(0);


export default function FormPropsTextFields() {
const [nome, setNome] =  useState("")
const [marca, setMarca] =  useState("")
const [uni, setUni] =  useState("")
let [number, setNumber] =  useState(0)
const handleChange = (event) => {
  setUni(event.target.value);
};
const handleSubmit = evt => {
evt.preventDefault()
fetch("http://localhost:3002/produto/cadastro", {
headers: {"Content-Type": "application/json"},
method: "POST",
body: JSON.stringify({nome: nome,
marca: marca,
unidade: uni})}).then(response => response.json())
.then(response => console.log("Success:", JSON.stringify(response))).then(()=>{let i = 0
  setNumber(number+1)})
.catch(error => console.error("Error:", error));
setNome("")
setMarca("")
setUni("")
}

  return (
    
    <UserContext.Provider value={number}>
    <Box
    
    sx={{ padding: '40px', paddingLeft: '15px' }}
      noValidate
      autoComplete="off"
    > 
      <form onSubmit={handleSubmit} >
      <div>
        
        <Logo src = {img}></Logo>
        <Box sx={{ }}>
        <TextField
          sx={{paddingRight: '15px'}}
          color='secondary'
          required
          id="outlined-required"
          label="Produto"
          name = "nome"
          value = {nome}
          onInput={e=>setNome(e.target.value)}
          
        />
        <TextField
          sx={{paddingRight: '15px'}}
          required
          name = "marca"
          id="outlined-disabled"
          label="Marca"
          value = {marca}
          onInput={e=>setMarca(e.target.value)}
          />  
      <FormControl sx={{ marginRight: '15px'}}>
        <InputLabel id="demo-simple-select-label">Unidade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={uni}
          label="Age"
          onChange={handleChange}
          sx={{width: '100px'}}
        >
          <MenuItem value={"m"}>metros</MenuItem>
          <MenuItem value={"uni"}>unidade</MenuItem>
          <MenuItem value={"kg"}>peso</MenuItem>
        </Select>
      </FormControl>
    
      <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: 'orange' }}

          >
            Cadastrar 
          </Button>
        </Box>
        
    </div>
    </form>
    <BasicTable  ></BasicTable>
    </Box>
    </UserContext.Provider>
    
    )
}
