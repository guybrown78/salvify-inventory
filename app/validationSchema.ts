import prisma from "@/prisma/client";
import { itemTypesValues, itemCategoryValues, itemGroupingValues, removeInstanceReasonValues, orderStatusValues } from '@/prisma/enums'
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

export const holdingSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255),
	field: z
		.string()
		.max(255)
		.optional(),
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