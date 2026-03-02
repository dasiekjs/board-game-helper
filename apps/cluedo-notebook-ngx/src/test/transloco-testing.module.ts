import {TranslocoTestingModule, TranslocoTestingOptions} from "@jsverse/transloco";
import pl from '../../public/i18n/pl.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { pl },
    translocoConfig: {
      availableLangs: ['pl'],
      defaultLang: 'pl',
    },
    preloadLangs: true,
    ...options,
  });
}
