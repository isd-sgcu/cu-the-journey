// prettier-ignore
function createSpriteResource(name: string, frames: number) {
  return Array 
    .from({ length: frames })
    .map((_, idx) => `images/screen/${name}-${idx + 1}.png`);
}

export const resources = <const>{
  bird: createSpriteResource("bird", 7),
  ogbg: createSpriteResource("ogbg", 3),
};

export type SpriteName = keyof typeof resources;
