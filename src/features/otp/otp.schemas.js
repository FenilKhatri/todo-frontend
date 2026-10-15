import { z } from "zod";

export const otpSchema = z.string().regex(/^\d{6}$/, "Enter all 6 digits.");
