import RegisterForm from '../forms/RegisterForm.jsx'
import { navigate } from '../lib/router.js'
import { passportId } from '../lib/format.js'
import '../styles/forms.css'

export default function RegisterView({ registry }) {
  const nextNumber = passportId(registry.nextObjectNumber)

  const handleSubmit = (input) => {
    const object = registry.registerObject(input)
    navigate(`/pasaportes/${object.id}/emitido`)
  }

  return (
    <div>
      <div className="section-head">
        <div>
          <h1>Solicitud de pasaporte</h1>
          <p>
            Completá los datos del objeto. Al emitir el pasaporte queda registrado con estado “En
            territorio nacional” si está en su lugar de origen.
          </p>
        </div>
        <span className="form-number">Formulario DNMO-01</span>
      </div>
      <RegisterForm onSubmit={handleSubmit} nextNumber={nextNumber} />
    </div>
  )
}
