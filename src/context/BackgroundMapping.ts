import { useRouter } from "solid-app-router";
import { useScene } from "../components/AnimationScene";
import type { SceneSwitchable } from "../components/AnimationScene/SceneEngine";

export interface BackgroundMappingProps {
  scene: SceneSwitchable;
  force: boolean;
}

interface IBackgroundMapping {
  [k: string]: SceneSwitchable | BackgroundMappingProps;
}

export default (): IBackgroundMapping => {
  const { sceneSwitcher } = useScene();
  const [_, { push }] = useRouter()!;
  return {
    "/": ["star-dark"],
    "/door-open": [
      {
        name: "door-open",
        loop: false,
        animationSpeed: 0.01,
        onComplete: () => {
          sceneSwitcher(
            [{ name: "landing", loop: false, onComplete: () => push("/landing") }],
            true,
          );
        },
      },
      "star-dark",
    ],
    "/landing": ["landing"],
    "/trigger-warning": { scene: ["trigger-warning"], force: true },
    "/inspired-by-DAE": ["trigger-warning"],

    //   // Scene 2
    "/2-0": ["star-dark"],

    //   // Scene 3
    "/3-0": ["star-light", "leaf-og"],
    "/3-1": ["star-light", "leaf-og"],
    "/3-2": ["star-light", "leaf-og"],
    "/3-3": ["star-light", "leaf-og"],
    "/3-3-1": ["star-light", "leaf-og"],
    "/3-4": ["star-light", "leaf-og"],

    //   // Scene 4
    "/4-0": ["star-dark"],
    "/4-1": ["star-light", "leaf"],
    "/4-1-1": ["star-light", "leaf"],
    "/4-1-2": ["star-light", "leaf"],
    "/4-2": ["star-light", "leaf"],

    //   // Scene 5
    "/5-0": ["star-light-full"],
    "/5-1": ["star-light-full"],
    "/5-2": ["star-light", "book"],
    "/5-3": ["star-light", "book"],
    "/5-4": ["star-light", "book"],
    "/5-5-1": ["star-light", "book"],
    "/5-5-2": ["star-light", "book"],
    "/5-5-3": ["star-light", "book"],

    //   // Scene 6
    "/6-0": ["star-light", { name: "book-open", loop: false }],
    "/6-1": ["star-light", "book-flip"],
    "/6-2": ["star-light", "book-flip"],
    "/6-3": ["star-light", "book-flip"],
    "/6-4": ["star-light-full"],

    //   // Scene 7
    "/7-0": ["star-light-full"],
    "/7-1": ["star-light", "paper"],
    "/7-1-1": ["star-light", "paper"],
    "/7-1-2": ["star-light", "paper"],
    "/7-2": ["star-light", "clock"],
    "/7-2-1": ["star-light", "clock"],
    "/7-2-2": ["star-light", "clock"],
    "/7-3": ["star-light", "phone"],
    "/7-3-1": ["star-light", "phone"],
    "/7-3-2": ["star-light", "phone"],

    //   // Scene 8
    "/8-0": ["star-light-full"],
    "/8-1": ["star-light-full"],
    "/8-2": ["star-light-full"],

    //   // Scene 9
    "/9-0": ["star-light-full", "book-flip"],

    //   // Scene 10
    "/10-0": ["star-light-full"],

    //   // Scene 11
    "/11-0": ["congrats"],

    //   // Scene 12
    "/12-0": ["star-light", { name: "book-close", loop: false }],

    //   // Scene 13
    "/13-0": ["star-light-full"],
    "/13-1": ["star-light-full"],
    "/13-2": ["star-light-full"],
    "/13-3": ["star-light-full"],

    //   // Scene 14
    "/14-0": ["star-light", { name: "book-first", loop: false }],
    "/14-1": ["star-light", { name: "book-first", loop: false }],

    //   // Scene 15
    "/15-0": ["star-light-full"],

    //   // Scene 16
    "/16-0": ["star-light"],

    //   // Scene 17
    "/17-0": ["star-light-full"],

    //   // Scene 18
    "/18-0": ["star-light-full"],
    "/18-1": ["star-light-full", "post-pp-sm"],

    //   // Scene 19
    "/19-0": ["star-light-full"],
    "/19-1": ["star-light-full"],

    //   // Scene 20
    "/20-0": ["star-light-full"],

    //   // Scene 21
    "/21-0": ["star-light-full"],

    //   // Scene 22
    "/22-0": ["star-light-full"],

    //   // Scene 23
    "/23-0": ["star-light-full", "secret"],

    //   // Scene 24
    "/24-0": ["star-light-full"],

    //   // Scene 27
    "/27-0": ["star-light-full"],

    //   // Scene 28
    "/28-0": ["star-light-full"],

    //   // Scene 29
    "/29-0": ["star-light-full"],
    //   "/29-0": "/pick-a-number",

    //   // pick-a-number
    "/pick-a-number": ["star-light-full"],

    // souvenir
    "/souvenir": ["souvenir-0"],
    "/souvenir?number=1": ["souvenir-1"],
    "/souvenir?number=2": ["souvenir-2"],
    "/souvenir?number=3": ["souvenir-3"],
    "/souvenir?number=4": ["souvenir-4"],
    "/souvenir?number=5": ["souvenir-5"],
    "/souvenir?number=6": ["souvenir-6"],
  };
};
