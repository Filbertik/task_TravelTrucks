import { useState } from "react";
import styles from "./BookingForm.module.css";
import { uk } from "date-fns/locale";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { format } from "date-fns";

const toISODate = (d) => {
  if (!(d instanceof Date)) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return `${y}-${m}-${day}`;
};

export default function BookingForm({ camper }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(null);

  const today = new Date();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Введіть ім’я");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return toast.error("Введіть правильний email");
    if (!date) return toast.error("Оберіть дату броні");

    const payload = {
      camperId: camper?.id ?? null,
      name: name.trim(),
      email: email.trim(),
      date: toISODate(date),
      comment: comment.trim(),
    };

    toast.success("Бронювання успішне!");

    setName("");
    setEmail("");
    setDate(null);
    setComment("");
  };

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={onSubmit} noValidate className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="bf-name" className={styles.srOnly}>
            Name
          </label>
          <input
            id="bf-name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
            className={styles.input}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bf-email" className={styles.srOnly}>
            Email
          </label>
          <input
            id="bf-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            className={styles.input}
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bf-date" className={styles.srOnly}>
            Booking date
          </label>
          <DatePicker
            id="bf-date"
            selected={date}
            onChange={setDate}
            locale={uk}
            dateFormat="dd.MM.yyyy"
            minDate={today}
            placeholderText="Booking date*"
            className={styles.input}
            popperPlacement="bottom-start"
            calendarClassName={styles.dp}
            popperClassName={styles.dpPopper}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className={styles.dpHeader}>
                <button
                  type="button"
                  className={styles.nav}
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  aria-label="Previous month"
                />
                <div className={styles.monthLabel}>
                  {format(date, "LLLL yyyy", { locale: uk })}
                </div>
                <button
                  type="button"
                  className={styles.nav}
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  aria-label="Next month"
                />
              </div>
            )}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bf-comment" className={styles.ask}>
            Comment{" "}
          </label>
          <textarea
            id="bf-comment"
            name="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>

        <button type="submit" className={styles.submit}>
          Send
        </button>
      </form>
    </section>
  );
}
