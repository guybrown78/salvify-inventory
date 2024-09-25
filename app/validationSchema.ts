import prisma from "@/prisma/client";
import { itemTypesValues, itemCategoryValues, itemGroupingValues, removeInstanceReasonValues, orderStatusValues, holdingTypeValues, userRoleValues } from '@/prisma/enums'
import { z } from "zod";

export const issueSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required.')
		.max(255),
	description: z
		.string()
		.min(1, 'Descriptin is required.')
		.max(65535)
});

export const patchIssueSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required.')
		.max(255)
		.optional(),
	description: z
		.string()
		.min(1, 'Description is required.')
		.max(65535)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssigneToUserId is required.")
		.max(255)
		.optional()
		.nullable(),
});



const ItemTypes = z.enum(itemTypesValues)
const ItemCategory = z.enum(itemCategoryValues)
const ItemGrouping = z.enum(itemGroupingValues)

export const itemSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255),
	information: z
		.string()
		.max(65535)
		.optional(),
	requiredCount: z
		.number()
		.int()
		.nullable()
		.optional(),
	type: ItemTypes
		.optional(),
	category: ItemCategory
		.optional(),
	grouping: ItemGrouping
		.optional(),
	instructionsURL: z
		.string()
		.optional(),
	bnfSlug: z
		.string()
		.optional(),
  emcId: z
		.string()
		.optional(),
})

export const patchItemSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255)
		.optional(),
	information: z
		.string()
		.max(65535)
		.optional(),
	requiredCount: z
		.number()
		.int()
		.nullable()
		.optional(),
	type: ItemTypes
		.optional(),
	category: ItemCategory
		.optional(),
	grouping: ItemGrouping
		.optional(),
	instructionsURL: z
		.string()
		.optional(),
	bnfSlug: z
		.string()
		.optional(),
  emcId: z
		.string()
		.optional(),
})

const HoldingTypes = z.enum(holdingTypeValues)

export const holdingSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255),
	field: z
		.string()
		.max(255)
		.optional(),
	canAddIncidents: z
		.boolean()
		.optional(),
	type: HoldingTypes
})
export const patchHoldingSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255)
		.optional(),
	field: z
		.string()
		.max(255)
		.optional(),
	canAddIncidents: z
		.boolean()
		.optional(),
	type: HoldingTypes
})

export const locationSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255),
	field: z
		.string()
		.max(255)
		.optional(),
})

export const patchLocationSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255)
		.optional(),
	field: z
		.string()
		.max(255)
		.optional(),
})


export const addInstanceSchema = z.object({
	itemId: z
		.string()
		.min(1, "Item is required"),
	locationId: z
		.string()
		.min(1, "Location is required"),
	expiryDate: z
		.string(),
	quantity: z
		.string()
		.min(1, "Quantity is required"),
	batch: z.string().optional(),
})

const removeReasons = z.enum(removeInstanceReasonValues)
export const removeInstanceSchema = z.object({
	quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .refine((val) => !isNaN(val), { message: "Quantity must be a number" }),
	prf: z.string().max(255).optional(),
	otherReason: z
		.string()
		.max(255)
		.optional(),
  reason: removeReasons,
	removedAt: z
		.string()
		.min(1, "Removed date is required")
})

export const swapInstanceSchema = z.object({
	holdingId: z
		.number()
		.min(1, "Holding is required"),
	locationId: z
		.string()
		.min(1, "Location is required"),
	quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .refine((val) => !isNaN(val), { message: "Quantity must be a number" }),
})


export const holdingItemSchema = z.object({
	requiredCount: z
		.number()
		.int()
		.nonnegative()
		.optional()
})

export const orderSchema = z.object({
	title: z
		.string()
		.max(255)
		.optional(),
	notes: z
		.string()
		.max(65535)
		.optional()
});


const OrderStatus = z.enum(orderStatusValues)
export const patchOrderSchema = z.object({
	title: z
		.string()
		.max(255)
		.optional(),
	notes: z
		.string()
		.max(65535)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssigneToUserId is required.")
		.max(255)
		.optional()
		.nullable(),
	status: OrderStatus
		.optional()
});


export const addOrderItemSchema = z.object({
	itemId: z
		.number()
		.min(1, "Item is required"),
	quantity: z
		.string()
		.min(1, "Quantity is required"),
})
export const patchOrderItemSchema = z.object({
	quantity: z
		.number()
		.min(1, { message: "Quantity must be at least 1" })
		.refine((val) => !isNaN(val), { message: "Quantity must be a number" }),
})


const UserRoles = z.enum(userRoleValues)

export const userSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: 'Firstname is required.' })
    .max(255),
  surname: z
    .string()
    .min(1, { message: 'Surname is required.' })
    .max(255),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .max(255)
    .email({ message: 'Invalid email address.' }),
  client: z
    .string()
    .min(1, { message: 'Client is required.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/\d/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Please confirm your password.' }),
	role: UserRoles,
})
.refine((data) => data.password === data.confirmPassword, {
	path: ['confirmPassword'],
	message: 'Passwords do not match.',
})
.refine((data) => data.role !== 'SUPERADMIN', {
	path: ['role'],
	message: 'You are not allowed to assign the SUPERADMIN role.',
});

export const patchUserSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Firstname is required." })
    .max(255, { message: "Firstname cannot exceed 255 characters." }),
  surname: z
    .string()
    .min(1, { message: "Surname is required." })
    .max(255, { message: "Surname cannot exceed 255 characters." }),
  optionalClients: z
    .array(z.number().int({ message: "Client ID must be an integer." }))
    .optional(),
  role: UserRoles,
}).refine((data) => data.role !== 'SUPERADMIN', {
  path: ['role'],
  message: 'Cannot assign SUPERADMIN role.',
});

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Client name is required." })
    .max(255, { message: "Client name cannot exceed 255 characters." }),
});
