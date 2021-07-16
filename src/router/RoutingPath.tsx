const FirstScene = () => <p>First Scene</p>;

const SecondScene = () => <p>Second Scene</p>;

const FallbackScene = () => <p>Not found</p>;

import { Choice } from "../components/Choice";

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
    component: Choice
  }
];
