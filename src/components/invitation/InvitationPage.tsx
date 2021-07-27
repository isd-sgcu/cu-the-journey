import { splitProps } from "solid-js";
import { replaceLine } from "../../pages/TextReplacer";

interface IInvitationPage {
  header: string;
}

export function InvitationPage(props: IInvitationPage) {
  const [local] = splitProps(props, ["header"]);

  return (
    <div class="w-full h-full flex items-center flex-col">
      <h2>{local.header}</h2>
      <div class="relative" style={{ "max-width": "300px" }}>
        <img class="w-full max-h-[300px] h-auto" alt="invite-card" src="images/invite-card.png" />
        <div class="absolute left-10 px-2 top-32 w-[157px] rotate-[-9deg]">
          <p
            style={{
              "font-size": "0.8rem",
              "line-height": "2.4",
              overflow: "hidden",
              "white-space": "nowrap",
            }}
          >
            {replaceLine("Dear (name)")}
          </p>
          <h6 style={{ "font-size": "0.8rem", "line-height": "1.6" }}>FREE YOUR MIND,</h6>
          <h6 style={{ "font-size": "0.8rem", "line-height": "1.6" }}>Find YOUR WAYS</h6>
          <p style={{ "font-size": "0.8rem", "line-height": "1.6" }}>
            {replaceLine("CU at (faculty)")}
          </p>
        </div>
      </div>
    </div>
  );
}
