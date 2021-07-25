type SpriteType = "Base" | "Fade" | "Zoom";

interface ICreateSpriteResource {
  type: SpriteType;
  frames: string[];
}

// prettier-ignore
function createSpriteResource(name: string, frames: number, type: SpriteType = "Fade") {
  return {
    type,
    frames: Array 
    .from({ length: frames })
    .map((_, idx) => `images/screen/${name}-${idx + 1}.png`)
  } as ICreateSpriteResource;  
}

export const resources = <const>{
  sprite: {
    leaf: createSpriteResource("leaf", 2),
    "dark-star": createSpriteResource("dark-star", 1),
    landing: createSpriteResource("landing", 1),
    "trigger-warning": createSpriteResource("trigger-warning", 1),
    "door-open": createSpriteResource("door-open", 2, "Zoom"),
  },
  sound: {
    bg: "music/background-sound.mp3",
  },
};

export type SpriteName = keyof typeof resources.sprite;

export type SoundName = keyof typeof resources.sound;
