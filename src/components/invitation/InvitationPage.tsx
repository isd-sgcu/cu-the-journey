import { splitProps } from "solid-js";

interface IInvitationPage {
  header: string;
}

export function InvitationPage(props: IInvitationPage) {
  const [local] = splitProps(props, ["header"]);
  return (
    <div class="w-full h-full">
      <h6>{local.header}</h6>
      <div class="relative">
        <div class="absolute"></div>
      </div>
    </div>
  );
}
