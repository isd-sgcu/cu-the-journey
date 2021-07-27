import { Component, For, createSignal, Accessor, createEffect, JSX } from "solid-js";
import Swal from "sweetalert2";
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
    [InputType: number]: { [lang: string]: string };
  } = {
    [InputType.ID]: { en: "a valid student ID", th: "รหัสนิสิต" },
    [InputType.EMAIL]: {
      en: "a valid email address",
      th: "ที่อยู่อีเมลล์",
    },
  };

  static readonly NOT_ERROR_MESSAGE = "";

  constructor(
    nameKey: string,
    placeHolderKey: string,
    readonly storeKey: string,
    readonly type: InputType = InputType.NICKNAME,
    readonly htmlProps: JSX.InputHTMLAttributes<HTMLInputElement> = {},
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
    const err = InputManager.ALL_ERROR_MESSAGES[this.type];
    this.errorMessage = isEnglish() ? err.en : err.th;
  };

  getError = () => this.errorMessage;
  clearError = () => (this.errorMessage = InputManager.NOT_ERROR_MESSAGE); // eslint-disable-line
}

const Scene2S0: Component = () => {
  const inputManagers = [
    new InputManager("2-0-name", "2-0-namePlaceHolder", StorableKeys.Nickname),
    new InputManager("2-0-id", "2-0-idPlaceHolder", StorableKeys.ID, InputType.ID, {
      inputMode: "numeric",
    }),
    new InputManager("2-0-email", "2-0-emailPlaceHolder", StorableKeys.Email, InputType.EMAIL, {
      autocomplete: "email",
      inputMode: "email",
    }),
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

    const isUsingEnglish = isEnglish();
    let text = isUsingEnglish ? "Please enter " : "โปรดใส่";
    text += errorMessages
      .filter(err => err !== InputManager.NOT_ERROR_MESSAGE)
      .join(isUsingEnglish ? " and " : "และ");
    text += isUsingEnglish ? "." : "ที่ถูกต้อง";
    Swal.fire({
      title: "",
      text,
      icon: "error",
      target: document.getElementById("swal") as HTMLDivElement,
      width: 325,
    });
  };

  const validateForms = () => {
    const validatedResults = inputManagers.map(manager => manager.isValid());
    return !validatedResults.includes(false);
  };

  return (
    <form
      class="flex flex-col h-[667px] max-w-[327px] justify-center items-center z-10 space-y-[24px] purple"
      onSubmit={e => {
        e.preventDefault();
        const activeElement = document.activeElement as HTMLElement | null;
        activeElement?.blur();
        if (!areAllFilled()) return;
        if (!validateForms()) {
          showAlert();
          return;
        }
        fadeOut(nextPage);
      }}
    >
      <h3>{t("2-0-order")}</h3>
      <For each={inputManagers}>
        {manager => (
          <div class="flex flex-col space-y-[12px]">
            <h5>{manager.name}</h5>
            <SmallInputBox
              placeHolder={manager.placeHolder}
              signal={[manager.text, manager.setText]}
              htmlProps={manager.htmlProps}
              noWrap={true}
            />
          </div>
        )}
      </For>
      <Button style={buttonStyle()}>
        <h6 class="leading-[28px] font-Mitr px-[12px] uppercase">{t("2-0-buttonText")}</h6>
      </Button>
    </form>
  );
};

export default { Scene2S0 };
