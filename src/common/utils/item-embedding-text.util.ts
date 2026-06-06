import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ItemEmbeddingType {
  LOST = 'LOST',
  FOUND = 'FOUND',
}

export class ItemEmbeddingTextInput {
  @IsOptional()
  @IsEnum(ItemEmbeddingType)
  itemType?: ItemEmbeddingType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  locationLost?: string;

  @IsOptional()
  @IsString()
  locationFound?: string;

  @IsOptional()
  @IsString()
  identifyingDetails?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export function buildItemEmbeddingText(item: ItemEmbeddingTextInput): string {
  const location = item.location ?? item.locationLost ?? item.locationFound;

  const lines = [
    item.itemType ? `Item type: ${item.itemType}` : undefined,
    `Title: ${item.title}`,
    `Description: ${item.description}`,
    item.category ? `Category: ${item.category}` : undefined,
    item.brand ? `Brand: ${item.brand}` : undefined,
    item.color ? `Color: ${item.color}` : undefined,
    location ? `Location: ${location}` : undefined,
    item.identifyingDetails
      ? `Identifying details: ${item.identifyingDetails}`
      : undefined,
  ];

  return lines.filter(Boolean).join('\n').trim();
}
