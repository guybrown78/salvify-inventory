import prisma from "@/prisma/client";
import { itemTypesValues, itemCategoryValues, itemGroupingValues } from '@/prisma/enums'
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
  bnfURL: z
		.string()
		.optional(),
  emcPilURL: z
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
  bnfURL: z
		.string()
		.optional(),
  emcPilURL: z
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