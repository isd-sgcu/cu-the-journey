/* eslint-disable no-unused-vars */
import { useI18n } from "@amoutonbrady/solid-i18n";

type ITranslation = [
  (key: string, params?: Record<string, string>, defaultValue?: string) => string,
  {
    add(lang: string, table: Record<string, any>): void;
    locale: (lang?: string) => string;
    dict: (lang: string) => Record<string, Record<string, any>>;
  }
];

export function useTranslation(prefix?: string): ITranslation {
  const [t, action] = useI18n();

  const newT = (key: string, params?: Record<string, string>, defaultValue?: string) => {
    if (!prefix) {
      return t(key, params, defaultValue);
    }
    return t(`${prefix}.${key}`, params, defaultValue);
  };

  return [newT, action];
}

export const dict = {
  th: {
    i18n: {
      hello: "สวัสดีโลก {{ name }}"
    }
  },
  en: {
    i18n: {
      hello: "Hello World {{ name }}"
    }
  }
};
