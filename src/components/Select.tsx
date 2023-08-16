import style from "./Select.module.css"

export default function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={style.select} name="" id="" {...props}/>
  )
}
