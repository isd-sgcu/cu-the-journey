type SpriteType = "Base" | "Fade" | "Zoom";

interface ICreateSpriteResource {
  type: SpriteType;
  zIndex: number;
  frames: string[];
}

// prettier-ignore
function createSpriteResource(name: string, frames: number, type: SpriteType = "Fade", zIndex: number = 0) {
  return {
    type,
    zIndex,
    frames: Array 
    .from({ length: frames })
    .map((_, idx) => `images/screen/${name}-${idx + 1}.png`)
  } as ICreateSpriteResource;  
}

export const resources = <const>{
  sprite: {
    "star-dark": createSpriteResource("star-dark", 1, "Fade", -1),
    "star-light": createSpriteResource("star-light", 1, "Fade", -1),
    "star-light-full": createSpriteResource("star-light-full", 1, "Fade", -1),
    "leaf-og": createSpriteResource("leaf-og", 5),
    leaf: createSpriteResource("leaf", 4),
    book: createSpriteResource("book", 3),
    "book-open": createSpriteResource("book-open", 3),
    "book-flip": createSpriteResource("book-flip", 3),
    "book-close": createSpriteResource("book-close", 4),
    "book-first": createSpriteResource("book-first", 4),
    clock: createSpriteResource("clock", 3),
    secret: createSpriteResource("secret", 2),
    landing: createSpriteResource("landing", 1),
    paper: createSpriteResource("paper", 1),
    phone: createSpriteResource("phone", 1),
    congrats: createSpriteResource("congrats", 1),
    "souvenir-0": createSpriteResource("souvenir-0", 1),
    "souvenir-1": createSpriteResource("souvenir-1", 1),
    "souvenir-2": createSpriteResource("souvenir-2", 1),
    "souvenir-3": createSpriteResource("souvenir-3", 1),
    "souvenir-4": createSpriteResource("souvenir-4", 1),
    "souvenir-5": createSpriteResource("souvenir-5", 1),
    "souvenir-6": createSpriteResource("souvenir-6", 1),
    "trigger-warning": createSpriteResource("trigger-warning", 1),
    "door-open": createSpriteResource("door-open", 2, "Zoom"),
  },
  sound: {
    bg: "music/background-sound.mp3",
  },
};

export type SpriteName = keyof typeof resources.sprite;

export type SoundName = keyof typeof resources.sound;
