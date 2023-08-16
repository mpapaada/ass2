import style from "./Button.module.css"

export default function Button(
    props: React.BaseHTMLAttributes<HTMLButtonElement>
) {
  return <button className={style.button} type="submit" {...props}/>
}