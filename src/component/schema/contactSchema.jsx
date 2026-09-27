import { z } from "zod";

/* ── Zod schema factory (uses t() for i18n messages) ─ */
export const buildContactSchema = (t) =>
  z.object({
    name: z.string().trim().min(1, t("contact.nameRequired")),
    email: z
      .string()
      .trim()
      .min(1, t("contact.emailRequired"))
      .email(t("contact.emailInvalid") ?? t("contact.emailRequired")),
    message: z.string().trim().min(1, t("contact.messageRequired")),
  });