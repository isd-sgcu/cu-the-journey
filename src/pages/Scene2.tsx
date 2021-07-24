import { Component, For, createSignal, Accessor, createEffect } from "solid-js";
import { sceneTranslator } from "../config/i18n";
import { SmallInputBox } from "../components/common/InputBox";
import { saveMessage, StorableKeys } from "../MessageStore";
import Button from "../components/common/Button";

const t = sceneTranslator("scene2");

class InputManager {
  text: Accessor<string>;
  setText: (v: string | ((prev: string) => string)) => string; // eslint-disable-line

  readonly name: string;

  readonly placeHolder: string;

  constructor(nameKey: string, placeHolderKey: string, readonly storeKey: StorableKeys) {
    const [g, s] = createSignal("");
    this.text = g;
    this.setText = s;

    this.name = t(nameKey);
    this.placeHolder = t(placeHolderKey);
  }

  saveMessage() {
    saveMessage(this.storeKey, this.text());
  }

  isEmpty() {
    return this.text().trim() === "";
  }
}

const Scene2S0: Component = () => {
  const inputPairs = [
    new InputManager("2-0-name", "2-0-namePlaceHolder", StorableKeys.Nickname),
    new InputManager("2-0-id", "2-0-idPlaceHolder", StorableKeys.ID),
    new InputManager("2-0-email", "2-0-emailPlaceHolder", StorableKeys.Email),
  ];

  // tells if all input boxes are filled
  const [areAllFilled, setAreAllFilled] = createSignal(false);
  createEffect(() => {
    setAreAllFilled(inputPairs.find(manager => manager.isEmpty()) === undefined);
  });

  // inline style of button depending on the state of areAllFilled
  const commonStyle = "margin-top: 46px; transition: all 300ms";
  const buttonStyle = () =>
    areAllFilled() ? commonStyle : `${commonStyle}filter: grayscale(0.7); opacity: 0.7`;

  return (
    <div class="flex flex-col h-[667px] w-[375px] justify-center items-center z-10 space-y-[24px] purple">
      <h3>{t("2-0-order")}</h3>
      <For each={inputPairs}>
        {manager => (
          <div class="flex flex-col space-y-[12px]">
            <h5>{manager.name}</h5>
            <SmallInputBox
              placeHolder={manager.placeHolder}
              signal={[manager.text, manager.setText]}
            />
          </div>
        )}
      </For>
      <Button
        onClick={() => {
          if (areAllFilled()) alert("Hi");
        }}
        style={buttonStyle()}
      >
        <h6 class="leading-[28px] font-Mitr px-[12px] uppercase">{t("2-0-buttonText")}</h6>
      </Button>
    </div>
  );
};

export default { Scene2S0 };
