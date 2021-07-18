import { useTranslation } from "../config/i18n";
import Souvenir from "../pages/ending/Souvenir";
import ChoiceComponent from "../components/Choice";
import SixthScene from "../pages/Scene6";
import Scene3 from "../pages/Scene3";
import Scene4 from "../pages/Scene4";
import PickANumber from "../pages/ending/PickANumber";
import SelectLanguage from "../pages/SelectLanguage";

const FirstScene = () => <p>First Scene</p>;

const SecondScene = () => <p>Second Scene</p>;

const FallbackScene = () => <p>Not found</p>;

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

export default [
  {
    path: "/",
    component: SelectLanguage
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
    component: FallbackScene
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
    path: "/3",
    component: Scene3
  },
  {
    path: "/4",
    component: Scene4
  },
  {
    path: "/6",
    component: SixthScene
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
