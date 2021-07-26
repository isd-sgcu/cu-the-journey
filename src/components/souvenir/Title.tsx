import TitleText from "./TitleText";
import Number from "./Number";

function Title(props: { language: string; fill: string; number: number }) {
  return (
    <div class="flex flex-col items-center">
      <TitleText fill={props.fill} />
      <Number {...props} />
    </div>
  );
}

export default Title;
