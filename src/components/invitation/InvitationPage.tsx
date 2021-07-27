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
        <div class="absolute left-[2.125rem] px-2 top-32 xs:top-[7.75rem] w-[170px] rotate-[-9deg]">
          <p
            style={{
              "font-size": "0.73rem",
              "line-height": "2",
              overflow: "hidden",
              "white-space": "nowrap",
              "text-align": "left",
            }}
          >
            {replaceLine("Dear (name)")}
          </p>
          <p style={{ "font-size": "0.73rem", "line-height": "1.6" }}>You're invited to</p>
          <h6 style={{ "font-size": "0.73rem", "line-height": "1.6" }}>
            FREE YOUR MIND, FIND YOUR WAYS
          </h6>
          <p style={{ "font-size": "0.73rem", "line-height": "1.6" }}>
            {replaceLine("CU at (faculty)")}
          </p>
        </div>
      </div>
    </div>
  );
}
