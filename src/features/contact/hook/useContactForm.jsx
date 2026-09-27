import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useContactUs } from "./usePostContact";
import { buildContactSchema } from "../../../component/schema/contactSchema";

/**
 * Shared contact-form logic used by both ContactSection and ContactGrid.
 * Returns everything the form JSX needs.
 */
export const useContactForm = () => {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(buildContactSchema(t)),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: { name: "", email: "", message: "" },
  });

  const { mutate: submitContact, isPending } = useContactUs();

  const onSubmit = (data) => {
    submitContact(data, {
      onSuccess: () => {
        toast.success(t("contact.successMessage"));
        form.reset();
      },
      onError: () => {
        toast.error(t("contact.errorMessage"));
      },
    });
  };

  const onError = (formErrors) => {
    const firstErrorKey = Object.keys(formErrors)[0];
    if (!firstErrorKey) return;
    const el = document.querySelector(`[name="${firstErrorKey}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  return {
    t,
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    onSubmit,
    onError,
    isPending,
  };
};