import { useState } from "react";
import Alerta from "./components/Alerta";
import axios from 'axios';


function App() {

  const [formulario, setFormulario] = useState({
    club: '',
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    celular: ''

  });
  const [alerta, setAlerta] = useState({})

  const clubes = [
    {
      value: 'Aldosivi',
      label: 'Aldosivi',
      id: '1'
    },
    {
      value: 'Argentinos',
      label: 'Argentinos',
      id: '2'
    },
    {
      value: 'Arsenal',
      label: 'Arsenal',
      id: '3'
    },
    {
      value: 'Atletico Tucumán',
      label: 'Atlético Tucumán',
      id: '4'
    },
    {
      value: 'Banfield',
      label: 'Banfield',
      id: '5'
    },
    {
      value: 'Barracas Central',
      label: 'Barracas Central',
      id: '6'
    },
    {
      value: 'Boca',
      label: 'Boca',
      id: '7'
    },
    {
      value: 'Central Cordoba',
      label: 'Central Córdoba',
      id: '8'
    },
    {
      value: 'Colon',
      label: 'Colón',
      id: '9'
    },
    {
      value: 'Defensa y Justicia',
      label: 'Defensa y Justicia',
      id: '10'
    },
    {
      value: 'Estudiantes',
      label: 'Estudiantes',
      id: '11'
    },
    {
      value: 'Gimnasia',
      label: 'Gimnasia',
      id: '12'
    },
    {
      value: 'Godoy Cruz',
      label: 'Godoy Cruz',
      id: '13'
    },
    {
      value: 'Huracan',
      label: 'Huracán',
      id: '14'
    },
    {
      value: 'Independiente',
      label: 'Independiente',
      id: '15'
    },
    {
      value: 'Lanus',
      label: 'Lanús',
      id: '16'
    },
    {
      value: 'Newells',
      label: "Newell's",
      id: '17'
    },
    {
      value: 'Patronato',
      label: 'Patronato',
      id: '18'
    },
    {
      value: 'Platense',
      label: 'Platense',
      id: '19'
    },
    {
      value: 'Racing',
      label: 'Racing',
      id: '20'
    },
    {
      value: 'River',
      label: 'River',
      id: '21'
    },
    {
      value: 'Rosario Central',
      label: 'Rosario Central',
      id: '22'
    },
    {
      value: 'San Lorenzo',
      label: 'San Lorenzo',
      id: '23'
    },
    {
      value: 'Sarmiento',
      label: 'Sarmiento',
      id: '24'
    },
    {
      value: 'Talleres',
      label: 'Talleres',
      id: '25'
    },
    {
      value: 'Tigre',
      label: 'Tigre',
      id: '26'
    },
    {
      value: 'Union',
      label: 'Unión',
      id: '27'
    },
    {
      value: 'Velez',
      label: 'Vélez',
      id: '28'
    },
  ]

  const {club, nombre, apellido, dni, email, celular} = formulario;

  const handleChange = e =>{
    setFormulario({
      ...formulario,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = async e =>{
    e.preventDefault()
    
    if([club, nombre, apellido, dni, email, celular].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const {data} = await axios.post('http://localhost:4000/api/usuarios',
      {club, nombre, apellido, dni, email, celular})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setFormulario({
        club: '',
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        celular: ''
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const {msg} = alerta;

  return (
    <div>
      <h1>Formulario</h1>

      <form
        onSubmit={handleSubmit}
      >

       <div className="border-azul">
        <select
          onChange={handleChange}
          name='club'
          value={club}
          className='border-none'
        >
          <option value="">¿de que club sos hincha?</option>
          {clubes.map(club =>(
            <option
              value={club.value}
              key={club.id}
            >
            {club.label}
            </option>
          ))}

        </select>
       </div>

       <div className="border-azul">
        <label>Nombre:</label>
        <input
          className='border-none'
          type="text"
          onChange={handleChange}
          name='nombre'
          value={nombre}
        />
       </div>

       <div className="border-azul">
       <label>Apellido:</label>
        <input
          className='border-none'
          type="text"
          onChange={handleChange}
          name='apellido'
          value={apellido}
        />
       </div>

       <div className="border-azul">
       <label>Dni:</label>
        <input
          className='border-none'
          type="number"
          onChange={handleChange}
          name='dni'
          value={dni}
        />
       </div>

       <div className="border-azul">
       <label>Email:</label>
        <input
          className='border-none'
          type="email"
          onChange={handleChange}
          name='email'
          value={email}
        />
       </div>

       <div className="border-azul">
       <label>Celular:</label>
        <input
          className='border-none'
          type="number"
          onChange={handleChange}
          name='celular'
          value={celular}
        />
       </div>

       {msg && <Alerta alerta={alerta}/>}

       <div className="submit">
        <input
          type="submit"
          value='Participar'
          />
       </div>

      </form>
    </div>
  );
}

export default App;
