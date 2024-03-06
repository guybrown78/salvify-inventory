import { cache } from 'react';
import prisma from '@/prisma/client';
import { Holding, HoldingType } from '@prisma/client';

export interface HoldingPageProps {
	params: { holdingId: string }
}

export interface HoldingWithLocations{ //extends Holding {
  id: number;
  title: string;
  field: string | null;
  isMainHolding: boolean;
  type: HoldingType;
  locations: {
    id: number;
    title: string;
    field: string | null;
    holdingId: number;
  }[];
}


export const fetchHolding = cache((id: number): Promise<HoldingWithLocations | null> => prisma.holding.findUnique({
  where: { id: id },
  include: { locations: true },
}));