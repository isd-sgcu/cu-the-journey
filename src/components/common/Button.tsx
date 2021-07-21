import { useRouter } from "solid-app-router";
import type { JSX } from "solid-js/jsx-runtime";

interface IProps {
  onClick?: (() => Promise<void>) | (() => void);
  href?: string;
}

function Button(props: IProps & JSX.HTMLAttributes<HTMLButtonElement>) {
  const { children, onClick, href, ...attributes } = props;
  const [, { push }] = useRouter()!;

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
    if (href) {
      push(href);
    }
  };

  return (
    <button
      class="h-[40px] min-w-[150px] px-[10px] border-[1px] border-purple bg-white rounded-full m-[8px]
      hover:bg-purple-light"
      onClick={handleClick}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
