import type { Password } from "../types/types";
import { toast } from "d9-toast";

export const validatePassword = (formData: Omit<Password, "id">) => {
    let isValidate = true;
    if (!formData.login) {
      toast.error("Логин обязателен!", {
        className: "error"
      });
      isValidate = false;
    }

    if (!formData.site) {
      toast.error("Сайт обязателен!", {
        className: "error",
      });
      isValidate = false;
    }

    if (!formData.password) {
      toast.error("Пароль обязателен", {
        className: "error",
      });
      isValidate = false;
    }

    return isValidate;
}