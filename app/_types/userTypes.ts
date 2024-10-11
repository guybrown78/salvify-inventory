import { Client, OptionalClient, User } from "@prisma/client";

export interface UserWithClient extends User
{
  selectedClient:Client
}

export interface UserWithClients extends UserWithClient{
	optionalClients:OptionalClient[]
}