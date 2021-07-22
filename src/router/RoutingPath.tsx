import type { Component } from "solid-js";
import { useTranslation } from "../config/i18n";
import Souvenir from "../pages/ending/Souvenir";
import ChoiceComponent from "../components/Choice";
import Fallback from "../pages/Fallback";
import AllScenes from "../pages/AllScenes";
import PickANumber from "../pages/ending/PickANumber";
import SelectLanguage from "../pages/landing/SelectLanguage";
import Landing from "../pages/landing";
import TW from "../pages/landing/TW";
import DAE from "../pages/landing/DAE";

const SecondScene = () => <p>Second Scene</p>;

const I18Testing = () => {
  const [t, { locale }] = useTranslation("i18n");
  return (
    <>
      <button onClick={() => locale("th")}>Change to TH</button>
      <button onClick={() => locale("en")}>Change to EN</button>
      <h1>{t("hello", { name: "Outsider" })}</h1>
      <h1>{t("nested.hello", { name: "Insider" })}</h1>
    </>
  );
};

const allPath = [
  {
    path: "/",
    component: SelectLanguage,
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/trigger-warning",
    component: TW,
  },
  {
    path: "/inspired-by-DAE",
    component: DAE,
  },
  {
    path: "/2",
    component: SecondScene,
  },
  {
    path: "*all",
    component: Fallback,
  },
  {
    path: "/choices",
    component: ChoiceComponent,
  },
  {
    path: "/i18n",
    component: I18Testing,
  },
  {
    path: "/pick-a-number",
    component: PickANumber,
  },
  {
    path: "/souvenir",
    component: Souvenir,
  },
];

/* will iterate through all scene in an import
 * and create corresponding paths
 * USE THIS FORMAT FOR ALL SCENES:
 * Scene_S_S_ where _ is a number
 * e.g. Scene12S5 -> /12-5
 */
interface IScene {
  [x: string]: Component<{}>;
}

const iterateScene = (scene: IScene) => {
  Object.keys(scene).forEach(page => {
    const convertPath = `/${page.toString().slice(5).replace(/S/g, "-")}`;
    const link = { path: convertPath, component: scene[page] };
    allPath.push(link);
  });
};

const iterateSceneImport = (allscene: Record<string, IScene>) => {
  Object.keys(allscene).forEach(scene => {
    iterateScene(allscene[scene]);
  });
};

iterateSceneImport(AllScenes);

export default allPath;
