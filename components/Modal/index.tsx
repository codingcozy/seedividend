import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

type ModalProps = {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
};

const Modal = ({ onClose, title, children, width = "500px" }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키를 눌렀을 때 모달 닫기
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // 모달 외부 클릭시 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 모달 포털 생성
  const modalContent = (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-container")} ref={modalRef} style={{ maxWidth: width }}>
        <div className={cx("modal-header")}>
          {title && <h2 className={cx("modal-title")}>{title}</h2>}
          <button className={cx("close-button")} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={cx("modal-content")}>{children}</div>
      </div>
    </div>
  );

  // 서버사이드 렌더링 대응
  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
