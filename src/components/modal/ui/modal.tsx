import { ButtonMain } from "@/shared/ui/buttonMain";
import style from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  stage?: "confirm" | "denied";
  onClose: () => void;
  onDenyConfirm?: () => void;
  onGoHome?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  stage,
  onClose,
  onDenyConfirm,
  onGoHome,
}) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modal__content}>
        <div className={style.modal__title}>Deny application</div>
        <button className={style.modal__buttonClose} onClick={onClose}>
          ×
        </button>
        {stage === "confirm" ? (
          <>
            <p className={style.modal__message}>
              Are you sure you want to deny the application?
            </p>
            <div className={style.modal__buttons}>
              <ButtonMain
                radius={8}
                width={96}
                color="red"
                onClick={onDenyConfirm}
              >
                Deny
              </ButtonMain>
              <ButtonMain radius={8} width={96} onClick={onClose}>
                Cancel
              </ButtonMain>
            </div>
          </>
        ) : (
          <>
            <p className={style.modal__message}>
              Your application has been denied
            </p>
            <div className={style.modal__buttons}>
              <ButtonMain onClick={onGoHome}>Go Home</ButtonMain>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
