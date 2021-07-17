import { useI18n } from "@amoutonbrady/solid-i18n";
import ChoiceComponent from "../components/Choice";

const FirstScene = () => <p>First Scene</p>;

const SecondScene = () => <p>Second Scene</p>;

const { Scene3S0, Scene3S1, Scene3S2 } = ThirdScene;

const FallbackScene = () => <p>Not found</p>;

const I18Testing = () => {
  const [t, { locale }] = useI18n();
  return (
    <>
      <button onClick={() => locale("th")}>Change to TH</button>
      <button onClick={() => locale("en")}>Change to EN</button>
      <h1>{t("hello")}</h1>
    </>
  );
};

export default [
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
  }
];
