import './styles.css'

// TODO (Level 1): accept children, variant, size; default type to "button"; build the class names
// TODO (Level 2): forward the rest of the props and merge className
// TODO (Level 3): loading, leftIcon, ref
export function Button({children, className, variant='primary', size='md',type='button', loading=false, leftIcon, disabled=false, ...rest}) {

  const classes = [`btn`, `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ');

  return <button 
      className={classes} 
      type={type} 
      disabled={disabled || loading} aria-busy={loading} 
      {...rest}>
        {loading && <span className="btn__spinner" aria-hidden="true"></span>}
        {leftIcon && !loading && <span className="btn__icon">{leftIcon}</span>}
        {children}
      </button>
}

// The preview app renders this. Use it to try out your Button.
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button variant='danger' size='sm'>Secondary</Button>
      <Button variant='secondary' size='sm' disabled>Disabled</Button>
      <Button variant='primary' size='lg' loading>Loading</Button>
      <Button variant='primary' size='md' leftIcon={<span>🚀</span>}>Loading</Button>
      
      
    
    </div>
  )
}
