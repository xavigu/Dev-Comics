import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from '../translations/es.json';
import en from '../translations/en.json';

const I18NContext = createContext();
const languages = { es, en };

export function I18nProvider({children}){
  const { locale } = useRouter();

  const translation = useCallback((key, ...args) => {
    let t = languages[locale][key];
    if (args.length === 0) return t;

    args.forEach((value, index) => {
      t = t.replace(`\${${index + 1}}`, value);
    });
    return t;
  },[locale]);

  return (
    <I18NContext.Provider value={{translation}}>
      {children}
    </I18NContext.Provider>
  )
}

// hook para indicar como usar el contexto i18n creado previamente
export function useI18N() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider")
  }
  return context
}