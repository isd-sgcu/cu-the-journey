import { Component, For, createSignal, Accessor, createEffect } from "solid-js";
import swal from "sweetalert";
import { sceneTranslator } from "../config/i18n";
import { SmallInputBox } from "../components/common/InputBox";
import { saveMessage, StorableKeys } from "../MessageStore";
import { useTransitionContext } from "../context/TransitionContext";
import Button from "../components/common/Button";
import { FACULTIES, getFacultyCode, isEnglish } from "./TextReplacer";

import "../styles/swal.css";

const t = sceneTranslator("scene2");

enum InputType { // eslint-disable-line
  NICKNAME,
  ID,
  EMAIL,
}

class InputManager {
  text: Accessor<string>;
  setText: (v: string | ((prev: string) => string)) => string; // eslint-disable-line

  errorMessage: string;

  readonly name: string;

  readonly placeHolder: string;

  static readonly ALL_ERROR_MESSAGES: {
    [InputType: number]: string;
  } = {
    [InputType.ID]: isEnglish() ? "Please enter a valid student ID" : "โปรดใส่รหัสนิสิตที่ถูกต้อง",
    [InputType.EMAIL]: isEnglish()
      ? "Please enter a valid email address"
      : "โปรดใส่ที่อยู่อีเมลล์ที่ถูกต้อง",
  };

  static readonly NOT_ERROR_MESSAGE = "";

  constructor(
    nameKey: string,
    placeHolderKey: string,
    readonly storeKey: string,
    readonly type: InputType = InputType.NICKNAME,
  ) {
    const [g, s] = createSignal("");
    this.text = g;
    this.setText = s;
    this.name = t(nameKey);
    this.placeHolder = t(placeHolderKey);
    this.errorMessage = "";
  }

  validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.toLowerCase())) return true;
    this.setError();
    return false;
  };

  validateId = (id: string) => {
    // check length
    if (id.length !== 10) {
      this.setError();
      return false;
    }
    // check if id is composed with only number digits
    const regExNumbersOnly = /^\d+$/;
    if (!regExNumbersOnly.test(id)) {
      this.setError();
      return false;
    }
    // check faculty code
    if (FACULTIES[getFacultyCode(id)]) return true;
    this.setError();
    return false;
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

  setError = () => {
    this.errorMessage = InputManager.ALL_ERROR_MESSAGES[this.type];
  };

  getError = () => this.errorMessage;
  clearError = () => (this.errorMessage = InputManager.NOT_ERROR_MESSAGE); // eslint-disable-line
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

  const showAlert = () => {
    const errorMessages = inputManagers.map(manager => {
      const err = manager.getError();
      manager.clearError();
      return err;
    });

    swal(
      "",
      errorMessages.filter(err => err !== InputManager.NOT_ERROR_MESSAGE).join("\n"),
      "error",
      {
        className: "font-Mitr",
      },
    );
  };

  const validateForms = () => {
    const validatedResults = inputManagers.map(manager => manager.isValid());
    return !validatedResults.includes(false);
  };

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
          if (!areAllFilled()) return;
          if (!validateForms()) {
            showAlert();
            return;
          }
          fadeOut(nextPage);
        }}
        style={buttonStyle()}
      >
        <h6 class="leading-[28px] font-Mitr px-[12px] uppercase">{t("2-0-buttonText")}</h6>
      </Button>
    </div>
  );
};

export default { Scene2S0 };
