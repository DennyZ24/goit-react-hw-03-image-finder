import s from "components/Section/Section.module.css";

export default function Section({ children }) {
  return (
    <section className={s.section}>
      {children}
    </section>
  )
}