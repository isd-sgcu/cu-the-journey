// prettier-ignore
function createSpriteResource(name: string, frames: number) {
  return Array 
    .from({ length: frames })
    .map((_, idx) => `images/screen/${name}-${idx + 1}.png`);
}

export const resources = <const>{
  sprite: {
    bird: createSpriteResource("bird", 7),
    ogbg: createSpriteResource("ogbg", 3)
  },
  sound: {
    bg: "music/background-sound.mp3"
  }
};

export type SpriteName = keyof typeof resources.sprite;

export type SoundName = keyof typeof resources.sound;
