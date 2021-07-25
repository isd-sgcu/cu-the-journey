import { useRouter } from "solid-app-router";
import { useScene } from "../components/AnimationScene";
import type { SceneSwitchable } from "../components/AnimationScene/SceneEngine";

interface IBackgroundMapping {
  [k: string]: SceneSwitchable;
}

export default (): IBackgroundMapping => {
  const { sceneSwitcher } = useScene();
  const [_, { replace }] = useRouter()!;
  return {
    "/": ["star-dark"],
    "/door-open": [
      {
        name: "door-open",
        loop: false,
        animationSpeed: 0.01,
        onComplete: () => {
          sceneSwitcher(
            [{ name: "landing", loop: false, onComplete: () => replace("/landing") }],
            true,
          );
        },
      },
      "star-dark",
    ],
    "/landing": ["landing"],
    "/trigger-warning": ["trigger-warning"],
    "/inspired-by-DAE": ["trigger-warning"],

    //   // Scene 2
    "/2-0": ["star-dark"],

    //   // Scene 3
    "/3-0": ["star-light", "leaf-og"],
    "/3-1": ["star-light", "leaf-og"],
    "/3-2": ["star-light", "leaf-og"],
    "/3-3": ["star-light"],
    "/3-3-1": ["star-light"],
    "/3-4": ["star-light"],

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
    //   "/7-0": "/7-1",
    //   "/7-1": "/7-1-1",
    //   "/7-1-1": "/7-1-2",
    //   "/7-1-2": "/7-2",
    //   "/7-2": "/7-2-1",
    //   "/7-2-1": "/7-2-2",
    //   "/7-2-2": "/7-3",
    //   "/7-3": "/7-3-1",
    //   "/7-3-1": "/7-3-2",
    //   "/7-3-2": "/8-0",

    //   // Scene 8
    //   "/8-0": "/8-1",
    //   "/8-1": "/8-2",
    //   "/8-2": "/9-0",

    //   // Scene 9
    //   "/9-0": "/10-0",

    //   // Scene 10
    //   "/10-0": "/11-0",

    //   // Scene 11
    //   "/11-0": "/12-0",

    //   // Scene 12
    //   "/12-0": "/13-0",

    //   // Scene 13
    //   "/13-1": "/14-0",
    //   "/13-2": "/14-0",
    //   "/13-3": "/14-0",

    //   // Scene 14
    //   "/14-0": "/14-1",
    //   "/14-1": "/15-0",

    //   // Scene 15
    //   "/15-0": "/16-0",

    //   // Scene 16
    //   "/16-0": "/17-0",

    //   // Scene 17
    //   "/17-0": "/18-0",

    //   // Scene 18
    //   "/18-0": "/18-1",
    //   "/18-1": "/19-0",

    //   // Scene 19
    //   "/19-1": "/20-0",

    //   // Scene 20
    //   "/20-0": "/21-0",

    //   // Scene 21
    //   "/21-0": "/22-0",

    //   // Scene 22
    //   "/22-0": "/23-0",

    //   // Scene 23
    //   "/23-0": "/24-0",

    //   // Scene 24
    //   "/24-0": "/27-0",

    //   // Scene 27
    //   "/27-0": "/28-0",

    //   // Scene 28
    //   "/28-0": "/29-0",

    //   // Scene 29
    //   "/29-0": "/pick-a-number",
  };
};
