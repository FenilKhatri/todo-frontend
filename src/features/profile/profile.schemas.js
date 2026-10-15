import { z } from "zod";
import { emailSchema, passwordSchema, userNameSchema } from "../../shared/validation/user.schemas";
import canonicalEmail from "../../shared/validation/canonicalEmail";
import { AVATAR_TYPES, MAX_AVATAR_SIZE } from "./profile.constants";

export { fieldErrors, serverFieldErrors } from "../../shared/validation/user.schemas";

export const profileSchema = z.object({ userName: userNameSchema });

export const changeEmailSchema = (currentEmail) =>
  z.object({
    email: emailSchema.refine((email) => !currentEmail || canonicalEmail(email) !== canonicalEmail(currentEmail), {
      message: "This is already your email address.",
    }),
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

export const avatarFileSchema = z
  .instanceof(File, { message: "Please choose an image to upload." })
  .refine((file) => AVATAR_TYPES.includes(file.type), "Only JPG, PNG, WEBP or GIF images are allowed.")
  .refine((file) => file.size > 0, "The image is empty.")
  .refine((file) => file.size < MAX_AVATAR_SIZE, "Image must be smaller than 5 MB.");
