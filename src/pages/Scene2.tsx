import { Component, For, createSignal, Accessor, createEffect } from "solid-js";
import { sceneTranslator } from "../config/i18n";
import { SmallInputBox } from "../components/common/InputBox";
import { saveMessage, StorableKeys } from "../MessageStore";
import { useTransitionContext } from "../context/TransitionContext";
import Button from "../components/common/Button";

const t = sceneTranslator("scene2");

enum InputType { // eslint-disable-line
  NICKNAME,
  ID,
  EMAIL,
}

class InputManager {
  text: Accessor<string>;
  setText: (v: string | ((prev: string) => string)) => string; // eslint-disable-line

  readonly name: string;

  readonly placeHolder: string;

  // This only gets called once
  static readonly VALID_FACULTY_CODE = (() => {
    const codes = [];
    // 20 - 40
    for (let i = 20; i < 41; i += 1) {
      codes.push(i.toString());
    }
    return [...codes, "51", "53", "55", "56", "58", "99", "01", "02"];
  })();

  constructor(
    nameKey: string,
    placeHolderKey: string,
    readonly storeKey: StorableKeys,
    readonly type: InputType = InputType.NICKNAME,
  ) {
    const [g, s] = createSignal("");
    this.text = g;
    this.setText = s;
    this.name = t(nameKey);
    this.placeHolder = t(placeHolderKey);
  }

  validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateId = (id: string) => {
    if (id.length !== 10) return false;
    return InputManager.VALID_FACULTY_CODE.includes(id.slice(8, 10));
  };

  isValid = () => {
    if (this.type === InputType.NICKNAME) return true;
    if (this.type === InputType.EMAIL) return this.validateEmail(this.text());
    return this.validateId(this.text());
  };

  // Should be called only if all input fields are filled
  save = () => {
    saveMessage(this.storeKey, this.text());
  };

  isEmpty = () => this.text().trim() === "";
}

const Scene2S0: Component = () => {
  const inputManagers = [
    new InputManager("2-0-name", "2-0-namePlaceHolder", StorableKeys.Nickname),
    new InputManager("2-0-id", "2-0-idPlaceHolder", StorableKeys.ID, InputType.ID),
    new InputManager("2-0-email", "2-0-emailPlaceHolder", StorableKeys.Email, InputType.EMAIL),
  ];

  // tells if all input boxes are filled
  const [areAllFilled, setAreAllFilled] = createSignal(false);
  createEffect(() => {
    setAreAllFilled(inputManagers.find(manager => manager.isEmpty()) === undefined);
    if (areAllFilled()) inputManagers.forEach(manager => manager.save()); // auto save if all boxes are filled
  });

  // inline style of button depending on the state of areAllFilled
  const commonButtonStyle = "margin-top: 46px; transition: all 300ms;";
  const buttonStyle = () =>
    areAllFilled()
      ? commonButtonStyle
      : `${commonButtonStyle} filter: grayscale(0.7); opacity: 0.7; cursor: not-allowed;`;

  const { fadeOut } = useTransitionContext();
  const nextPage = "/3-0";

  return (
    <div class="flex flex-col h-[667px] w-[375px] justify-center items-center z-10 space-y-[24px] purple">
      <h3>{t("2-0-order")}</h3>
      <For each={inputManagers}>
        {manager => (
          <div class="flex flex-col space-y-[12px]">
            <h5>{manager.name}</h5>
            <SmallInputBox
              placeHolder={manager.placeHolder}
              signal={[manager.text, manager.setText]}
              noWrap={true}
            />
          </div>
        )}
      </For>
      <Button
        onClick={() => {
          if (areAllFilled()) fadeOut(nextPage);
        }}
        style={buttonStyle()}
      >
        <h6 class="leading-[28px] font-Mitr px-[12px] uppercase">{t("2-0-buttonText")}</h6>
      </Button>
    </div>
  );
};

export default { Scene2S0 };
