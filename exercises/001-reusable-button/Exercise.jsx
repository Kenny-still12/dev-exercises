import './styles.css'

// TODO (Level 1): accept children, variant, size; default type to "button"; build the class names
// TODO (Level 2): forward the rest of the props and merge className
// TODO (Level 3): loading, leftIcon, ref
export function Button(props) {
  return <button>{props.children}</button>
}

// The preview app renders this. Use it to try out your Button.
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      {/* TODO: add examples for each variant, size, disabled, loading, and leftIcon */}
    </div>
  )
}
