```ts
import { defaultLocale, locales, ui } from '~/i18n/ui';

const lang = (Astro.currentLocale || defaultLocale) as keyof typeof ui;
const t = useTranslations(lang);
```

```sveltehtml
<p>{@html t("homepage.welcome", { name: "Jane Doe" })}!</p>
```
