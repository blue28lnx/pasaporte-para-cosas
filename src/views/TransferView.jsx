import TransferForm from '../forms/TransferForm.jsx'
import '../styles/forms.css'

export default function TransferView({ registry, objectId, onAuthorized }) {
  const { objects } = registry

  const handleSubmit = (request) => {
    const movement = registry.transferObject(request)
    if (movement) onAuthorized(movement)
  }

  return (
    <div>
      <div className="section-head">
        <div>
          <h1>Solicitud de traslado</h1>
          <p>
            Indicá a dónde se muda el objeto y por qué. La autorización se emite en el acto, con sello
            y número de expediente.
          </p>
        </div>
        <span className="form-number">Formulario DNMO-02</span>
      </div>

      {objects.length === 0 ? (
        <div className="archive-empty">
          <p>Para solicitar un traslado primero tiene que haber un objeto con pasaporte.</p>
          <a href="#/registrar" className="btn btn-primary">
            Registrar nuevo objeto
          </a>
        </div>
      ) : (
        <TransferForm
          key={objectId ?? 'nuevo'}
          objects={objects}
          initialObjectId={objectId}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
