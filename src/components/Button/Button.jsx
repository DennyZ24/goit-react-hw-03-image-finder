import s from "components/Button/Button.module.css";


export default function ButtonLoadMore({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={s.Button}>Load more</button>
  )
}