import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries-shared";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconTelegram,
  IconWhatsApp,
} from "./icons";
import { Logo } from "./Logo";
import { CopyrightYear } from "./CopyrightYear";

export async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.footer;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                GETTIK<span className="text-brand-600">.KG</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {t.description}
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href="tel:+996700000000"
                className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-700"
              >
                <IconPhone className="h-4 w-4 text-brand-600" />
                +996 700 000 000
              </a>
              <a
                href="mailto:hello@kettik.kg"
                className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-700"
              >
                <IconMail className="h-4 w-4 text-brand-600" />
                hello@kettik.kg
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: IconTelegram, label: "Telegram" },
                { Icon: IconInstagram, label: "Instagram" },
                { Icon: IconWhatsApp, label: "WhatsApp" },
                { Icon: IconFacebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {t.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-slate-900">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-brand-700"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © <CopyrightYear /> GETTIK.KG. {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{t.country}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{t.currencyLabel} {t.currencyValue}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{t.languageLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
