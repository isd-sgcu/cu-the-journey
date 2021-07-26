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
        <img
          class="w-full"
          alt="invite-card"
          src="images/invite-card.png"
          style={{ "max-width": "300px", height: "auto" }}
        />
        <div
          class="absolute left-10 px-2"
          style={{
            transform: "rotate(-9deg)",
            width: "157px",
            top: "8.25rem",
          }}
        >
          <p
            style={{
              "font-size": "0.8rem",
              "line-height": "1.6",
              overflow: "hidden",
              "white-space": "nowrap",
            }}
          >
            {replaceLine("Dear (name)")}
          </p>
          <h6 style={{ "font-size": "0.8rem", "line-height": "1.6" }}>FREE YOUR MIND, Find</h6>
          <h6 style={{ "font-size": "0.8rem", "line-height": "1.6" }}>YOUR WAYS</h6>
          <p style={{ "font-size": "0.8rem", "line-height": "1.6" }}>
            {replaceLine("CU at (faculty)")}
          </p>
        </div>
      </div>
    </div>
  );
}
