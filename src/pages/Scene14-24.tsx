import { Component, createSignal, onMount } from "solid-js";
import { StorableKeys, getMessage } from "../MessageStore";
import InputBoxScene, { InputBoxScenePropsType } from "../components/InputBoxScene";
import { TextMiddle } from "../components/Text";
import { sceneTranslator } from "../config/i18n";
import ChoiceComponent from "../components/Choice";
import { uploadTimeCapsule } from "../firebase";
import { replaceNameAndFaculty } from "./TextReplacer";
import Typography from "../components/common/Typography";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

const t = sceneTranslator("scene14to24");

const Scene14S0: Component = () => (
  <>
    <TextMiddle text={replaceNameAndFaculty(t("14-0"))} />
  </>
);

const Scene14S1: Component = () => {
  const props: InputBoxScenePropsType = {
    isMinimized: true,
    placeHolderKey: "14-placeholder",
    nextPage: "/15-0",
    orderKeys: ["14-order1", "14-order2"],
    buttonTextKey: "14-buttonText",
    onTapTextKey: "14-tapText",
    storeKey: StorableKeys.Scene14S1,
    t,
  };
  return <InputBoxScene {...props} />;
};

const Scene15S0: Component = () => (
  <>
    <TextMiddle text={t("15-0")} />
  </>
);

const Scene16S0: Component = () => {
  const props: InputBoxScenePropsType = {
    isMinimized: false,
    nextPage: "/17-0",
    orderKeys: "16-order",
    placeHolderKey: "16-placeholder",
    buttonTextKey: "16-button",
    onTapTextKey: "16-tap",
    storeKey: StorableKeys.Scene16S0,
    t,
  };
  return <InputBoxScene {...props} />;
};

const Scene17S0: Component = () => (
  <>
    <TextMiddle text={t("17-0")} />
  </>
);

const Scene18S0: Component = () => (
  <>
    <TextMiddle text={t("18-0")} />
  </>
);

const Scene18S1: Component = () => {
  const { scheduleFrame } = useTransitionContext();

  onMount(() => scheduleFrame(1));

  return (
    <div>
      <TransitionFade order={0}>
        <Typography class="mb-5">{t("18-1")}</Typography>
      </TransitionFade>
      <TransitionFade class="relative" order={1}>
        <div class="relative">
          <img class="max-w-[250px]" src="images/screen/post-pp-sm-1.png" />
          <Typography
            class="absolute top-10 px-3 w-[210px] h-[40vh] max-h-[220px]"
            style="overflow-wrap: break-word; left: 50%; transform: translateX(-52%);overflow-y: scroll"
            variant="p"
          >
            {getMessage(StorableKeys.Scene8S2) || ""}
          </Typography>
        </div>
      </TransitionFade>
    </div>
  );
};

const Scene19S0: Component = () => (
  <>
    <ChoiceComponent question={t("19-0.q")} choices={[t("19-0.c1"), t("19-0.c2")]} />
  </>
);

const Scene19S1: Component = () => {
  const props: InputBoxScenePropsType = {
    isMinimized: true,
    nextPage: "/20-0",
    orderKeys: "19-1-order",
    placeHolderKey: "19-1-placeHolder",
    buttonTextKey: "19-1-buttonText",
    onTapTextKey: "19-1-tap",
    storeKey: StorableKeys.Scene19S1,
    t,
  };
  return <InputBoxScene {...props} />;
};

const Scene20S0: Component = () => (
  <>
    <TextMiddle text={t("20-0")} />
  </>
);

const Scene21S0: Component = () => (
  <>
    <TextMiddle text={t("21-0")} />
  </>
);

const Scene22S0: Component = () => (
  <>
    <TextMiddle text={t("22-0")} />
  </>
);

const Scene23S0: Component = () => (
  <>
    <div class="flex-grow" />
    <Typography class="mb-20 xs:mb-10">{t("23-0")}</Typography>
  </>
);

const Scene24S0: Component = () => {
  const [text, setText] = createSignal("");
  const props: InputBoxScenePropsType = {
    isMinimized: false,
    nextPage: "/27-0",
    orderKeys: "24-0-order",
    placeHolderKey: "24-0-placeHolder",
    buttonTextKey: "24-0-buttonText",
    onTapTextKey: "24-0-tap",
    storeKey: StorableKeys.TimeCapsule,
    t,
    text,
    setText,
    onButtonClicked: () => {
      uploadTimeCapsule(
        getMessage(StorableKeys.ID) as string,
        getMessage(StorableKeys.Email) as string,
        {
          text: getMessage(StorableKeys.TimeCapsule) as string,
          name: getMessage(StorableKeys.Nickname) as string,
        },
      );
    },
  };
  return <InputBoxScene {...props} />;
};

export default {
  Scene14S0,
  Scene14S1,
  Scene15S0,
  Scene16S0,
  Scene17S0,
  Scene18S0,
  Scene18S1,
  Scene19S0,
  Scene19S1,
  Scene20S0,
  Scene21S0,
  Scene22S0,
  Scene23S0,
  Scene24S0,
};
