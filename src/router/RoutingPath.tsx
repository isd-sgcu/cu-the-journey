import type { Component } from "solid-js";
import Souvenir from "../pages/ending/Souvenir";
import Fallback from "../pages/Fallback";
import AllScenes from "../pages/AllScenes";
import PickANumber from "../pages/ending/PickANumber";
import SelectLanguage from "../pages/landing/SelectLanguage";
import Landing from "../pages/landing";
import TW from "../pages/landing/TW";
import DAE from "../pages/landing/DAE";

const allPath = [
  {
    path: "/",
    component: SelectLanguage,
  },
  {
    path: "/door-open",
    component: () => <></>,
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
    path: "*all",
    component: Fallback,
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
