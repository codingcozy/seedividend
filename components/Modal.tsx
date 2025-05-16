import { useEffect, useRef } from "react";
import classnames from "classnames/bind";
import style from "./Modal.module.scss";

const cx = classnames.bind(style);

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키 눌렀을 때 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal")} ref={modalRef}>
        <div className={cx("modal-header")}>
          <h2>{title}</h2>
          <button onClick={onClose} className={cx("close-button")}>
            &times;
          </button>
        </div>
        <div className={cx("modal-content")}>{children}</div>
      </div>
    </div>
  );
}
