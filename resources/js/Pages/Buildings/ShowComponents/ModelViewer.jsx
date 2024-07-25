export function ModelViewer ({ filename, className = '' }) {
  return (
    <model-viewer class={className} src={`/storage/3D_models/${filename}`} tone-mapping='neutral' shadow-intensity='1' camera-controls touch-action='pan-y' auto-rotate>
      <button>
        Boton
      </button>
    </model-viewer>
  )
}
