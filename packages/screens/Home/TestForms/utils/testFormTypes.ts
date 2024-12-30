import { z } from "zod";

import { DEFAULT_FORM_ERRORS } from "@/utils/errors";

// =================== Used to build front form =======================

export const ZodMemberObject = z.object({
  name: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  isBlacklisted: z.boolean(),
});

export const ZodSecretListObject = z.object({
  members: z.array(ZodMemberObject).nonempty(),
  label: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required), // custom "required" error
});

const ZodCategoryObject = z.number();

export const ZodFormObject = z.object({
  title: z
    .string()
    .trim() // ignore blank string
    .min(1), // at least one character

  description: z
    .string()
    .trim()
    .optional() // field not provided, or explicitly `undefined`
    .nullable() // field explicitly `null`
    .nullish(), // field not provided, explicitly `null`, or explicitly `undefined`

  category: ZodCategoryObject,

  royalties: z.number({ invalid_type_error: DEFAULT_FORM_ERRORS.onlyNumbers }), // custom type error

  members: z.array(ZodMemberObject).nonempty(), // at least one item

  secretList: ZodSecretListObject.optional(),

  // ------ Random examples
  // name: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // description: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // symbol: z
  //   .string()
  //   .trim()
  //   .toUpperCase()
  //   .min(1, DEFAULT_FORM_ERRORS.required)
  //   .refine(
  //     (value) => LETTERS_REGEXP.test(value),
  //     DEFAULT_FORM_ERRORS.onlyLetters,
  //   ),
  // websiteLink: z
  //   .string()
  //   .trim()
  //   .min(1, DEFAULT_FORM_ERRORS.required)
  //   .refine((value) => URL_REGEX.test(value), DEFAULT_FORM_ERRORS.onlyUrl),
  // // email: z
  // //   .string()
  // //   .trim()
  // //   .min(1, DEFAULT_FORM_ERRORS.required)
  // //   .refine((value) => EMAIL_REGEXP.test(value), DEFAULT_FORM_ERRORS.onlyEmail),
  // projectTypes: z.array(z.string().trim()).min(1, DEFAULT_FORM_ERRORS.required),
  // revealTime: z.number().optional(),
  // teamDescription: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // partnersDescription: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // investDescription: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // investLink: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // artworkDescription: z.string().trim().min(1, DEFAULT_FORM_ERRORS.required),
  // // coverImage: ZodLocalFileData,
  // isPreviouslyApplied: z.boolean(),
  // isDerivativeProject: z.boolean(),
  // isReadyForMint: z.boolean(),
  // isDox: z.boolean(),
  // escrowMintProceedsPeriod: z
  //   .string()
  //   .trim()
  //   .min(1, DEFAULT_FORM_ERRORS.required),
  // daoWhitelistCount: z
  //   .string()
  //   .trim()
  //   .min(1, DEFAULT_FORM_ERRORS.required)
  //   .refine(
  //     (value) => NUMBERS_REGEXP.test(value),
  //     DEFAULT_FORM_ERRORS.onlyNumbers,
  //   ),
  // mintPeriods: z.array(ZodCollectionMintPeriodFormValues).nonempty(),
  // royaltyAddress: z.string().trim().optional(),
  // royaltyPercentage: z
  //   .string()
  //   .trim()
  //   .refine(
  //     (value) => !value || NUMBERS_REGEXP.test(value),
  //     DEFAULT_FORM_ERRORS.onlyNumbers,
  //   )
  //   .optional(),
  // assetsMetadatas: ZodCollectionAssetsMetadatasFormValues.optional(),
  // baseTokenUri: z
  //   .string()
  //   .trim()
  //   .refine(
  //     (value) => !value || isIpfsPathValid(value),
  //     DEFAULT_FORM_ERRORS.onlyIpfsUri,
  //   )
  //   .optional(),
  // coverImageUri: z
  //   .string()
  //   .trim()
  //   .refine(
  //     (value) => !value || isIpfsPathValid(value),
  //     DEFAULT_FORM_ERRORS.onlyIpfsUri,
  //   )
  //   .optional(),
});

export type FormObject = z.infer<typeof ZodFormObject>;

export type SecretListObject = z.infer<typeof ZodSecretListObject>;

// ================= Used to validate data from API ===================

export const ZodFakeDataFromAPI = z.object({
  // ----- Wrong shape that fails at "data from API" parsing
  // title: z.string(),
  // description: z.string().trim().optional().nullable().nullish(),
  // category: ZodCategoryObject,
  // royalties: z.number(),
  // members: z.array(ZodMemberObject).nonempty(),
  // secretList: ZodSecretListObject.optional(),

  // ----- Good shape that parse correctly the "data from API"
  name: z.string(),
  description: z.string().optional(),
  category: z.string().nullish(),
  members: z.array(z.string()).nullish(),
  royalties: z.number().nullish(),
  comment: z.string().nullable(),
});
