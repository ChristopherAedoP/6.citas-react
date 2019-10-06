import React , { useState , useEffect , Fragment } from 'react';

function Formulario({crearCita}) {

  const stateinicial = {
    mascota :'',
    propietario :'',
    fecha:'',
    hora :'',
    sintomas :''

  }

  const [cita , actualizarCita] = useState(stateinicial);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }
  
  const enviarCita = e => {
    e.preventDefault();

    crearCita(cita)

    actualizarCita(stateinicial)

  }

  return (
    <Fragment>
          <h2>Crear Cita</h2>

          <form onSubmit={enviarCita}>
                      <label>Nombre Mascota</label>
                      <input 
                        type="text" 
                        name="mascota"
                        className="u-full-width" 
                        placeholder="Nombre Mascota" 
                        onChange={actualizarState}
                        value={cita.mascota}
                      />

                      <label>Nombre Dueño</label>
                      <input 
                        type="text" 
                        name="propietario"
                        className="u-full-width"  
                        placeholder="Nombre Dueño de la Mascota" 
                        onChange={actualizarState}
                        value={cita.propietario}
                      />

                      <label>Fecha</label>
                      <input 
                        type="date" 
                        className="u-full-width"
                        name="fecha"
                        onChange={actualizarState}
                        value={cita.fecha}
                      />               

                      <label>Hora</label>
                      <input 
                        type="time" 
                        className="u-full-width"
                        name="hora" 
                        onChange={actualizarState}
                        value={cita.hora}
                      />

                      <label>Sintomas</label>
                      <textarea 
                        className="u-full-width"
                        name="sintomas"
                        onChange={actualizarState}
                        value={cita.sintomas}
                      ></textarea>

                      <button type="submit" className="button-primary u-full-width">Agregar</button>
              </form>
      </Fragment>    
  )
}

function Cita({cita,index,eliminarCita}) {
  return (
    <div className="cita">
      <p><span>Mascota :</span> {cita.mascota}</p>
			<p><span>Dueño :</span> {cita.propietario}</p>
			<p><span>Fecha :</span> {cita.fecha}</p>
			<p><span>Hora :</span> {cita.hora}</p>
			<p><span>sintomas</span></p>
			<p>{cita.sintomas} </p>
      <button onClick={() => eliminarCita(index)}
        type="button" className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )
}

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(!citasIniciales){
      citasIniciales =[];
    }

  //useState retorna 2 funciones
  //el state es igual que = this.state
  //funcion que actualiza el state this.setState();
  const [citas , guardarCitas] = useState(citasIniciales);

  const crearCita = cita => {
    
    const nuevasCitas = [...citas,cita];
    guardarCitas(nuevasCitas)
  }

  const eliminarCita = index => {
    const actualCitas = [...citas];
    actualCitas.splice(index,1);
    guardarCitas(actualCitas)
  }

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administra las citas aquí.';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}/>
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita,index) => (
              <Cita 
                key ={index}
                index={index}
                cita={cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>          
        </div>
      </div>

    </Fragment>
  );
}


export default App;
