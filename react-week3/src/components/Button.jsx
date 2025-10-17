import './Button.css'
export default function Button({ variant = 'primary', children, ...rest }){
  return <button className={`btn ${variant}`} {...rest}>{children}</button>
}
