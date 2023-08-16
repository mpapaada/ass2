import style from './Option.module.css'

type OptionProps ={
    value: number
}
export default function Option(props: OptionProps) {
    const{ value }= props
  return (
    <option className={style.option} value={value}>{value}</option>
  )
}
