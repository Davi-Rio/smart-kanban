import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function Select({
  value,
  options,
  onChange,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.control} ${open ? styles.open : ""}`}
        onClick={() => setOpen(prev => !prev)}
      >
        <span>
          {selected ? selected.label : placeholder}
        </span>

        <span className={`${styles.chevron} ${open ? styles.rotate : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${styles.option} ${
                option.value === value ? styles.active : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
