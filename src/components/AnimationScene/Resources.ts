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
    "star-dark": createSpriteResource("star-dark", 1),
    "star-light": createSpriteResource("star-light", 1),
    "star-light-full": createSpriteResource("star-light-full", 1),
    "leaf-og": createSpriteResource("leaf-og", 3),
    leaf: createSpriteResource("leaf", 3),
    book: createSpriteResource("book", 3),
    "book-open": createSpriteResource("book-open", 3),
    "book-flip": createSpriteResource("book-flip", 3),
    "book-close": createSpriteResource("book-close", 4),
    "book-first": createSpriteResource("book-first", 4),
    clock: createSpriteResource("clock", 3),
    secret: createSpriteResource("secret", 2),
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
