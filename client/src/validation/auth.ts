import { toast } from "d9-toast";

export const validateAuth = (email: string, password: string) => {
    const errors: string[] = [];
    let isValidate = true;

    if (!email.trim()) errors.push("Email обязателен");
    if (!password.trim()) errors.push("Пароль обязателен");
    if (password.length < 6) errors.push("Пароль минимум 6 символов");

    if (errors.length > 0) {
      const errorMessage = errors.join(", ")
      toast.error(errorMessage, {
        className: "error",
        closable: true
      });
      isValidate = false;
    }

    return isValidate
}