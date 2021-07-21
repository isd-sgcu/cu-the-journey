import { Index, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

/*
 * Typography component is a component that displays text in multiple lines (split by `\n`).
 * You can select an element type by passing a props `variant`(can be h1,h2,h3,h4,h5,h6,p).
 * The element will be rendered with the rest of the provided props.
 */

interface IProps {
  children?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

function Typography(props: IProps & JSX.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>) {
  const { children, variant, ...attributes } = props;

  return (
    <Dynamic component={variant || "p"} {...attributes}>
      <Index each={children!.split(/\n|\\n/)}>
        {item => (
          <>
            {item}
            <br />
          </>
        )}
      </Index>
    </Dynamic>
  );
}

export default Typography;
