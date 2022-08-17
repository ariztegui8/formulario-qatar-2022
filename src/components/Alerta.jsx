import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'red' : 'blue'}`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta