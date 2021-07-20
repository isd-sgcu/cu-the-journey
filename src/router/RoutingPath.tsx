import { useTranslation } from "../config/i18n";
import Souvenir from "../pages/ending/Souvenir";
import ChoiceComponent from "../components/Choice";
import Fallback from "../pages/Fallback";
import Scene3 from "../pages/Scene3";
import Scene4 from "../pages/Scene4";
import Scene5 from "../pages/Scene5";
import PickANumber from "../pages/ending/PickANumber";
import SelectLanguage from "../pages/SelectLanguage";
import Landing from "../pages/landing";
import TW from "../pages/landing/TW";

const FirstScene = () => <p>First Scene</p>;

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
    component: SelectLanguage
  },
  {
    path: "/landing",
    component: Landing
  },
  {
    path: "/trigger-warning",
    component: TW
  },
  {
    path: "/1",
    component: FirstScene
  },
  {
    path: "/2",
    component: SecondScene
  },
  {
    path: "*all",
    component: Fallback
  },
  {
    path: "/choices",
    component: ChoiceComponent
  },
  {
    path: "/i18n",
    component: I18Testing
  },
  {
    path: "/pick-a-number",
    component: PickANumber
  },
  {
    path: "/souvenir",
    component: Souvenir
  }
];

/* will iterate through all scene in an import
 * and create corresponding paths
 * USE THIS FORMAT FOR ALL SCENES:
 * Scene_S_S_ where _ is a number
 * e.g. Scene12S5 -> /12-5
 */
const iterateScene = (scene: object) => {
  Object.keys(scene).forEach(page => {
    const convertPath = `/${page.toString().slice(5).replace(/S/g, "-")}`;
    const link = { path: convertPath, component: scene[page] };
    allPath.push(link);
  });
};

// this will be changed later
iterateScene(Scene3);
iterateScene(Scene4);
iterateScene(Scene5);

export default allPath;
