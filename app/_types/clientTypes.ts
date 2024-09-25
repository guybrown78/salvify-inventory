import { Client, Item, User } from "@prisma/client";

export interface ClientWithUserItems extends Client
{
  users: User[];
	items: Item[]
}
