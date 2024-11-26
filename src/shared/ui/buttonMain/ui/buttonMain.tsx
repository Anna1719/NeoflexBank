import style from './buttonMain.module.scss';

type TProps = {
  text: string;
  radius?: number; 
  onClick?: () => void;
  children? : React.ReactNode;
}

export const ButtonMain = ({ text, radius, onClick, children }: TProps) => {
  const borderRadius = "buttonRadius-" + radius;
  return (
    <button className={`${style.buttonMain} ${style[borderRadius]}`} onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

