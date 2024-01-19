//export const dynamic = 'force-dynamic' // defaults to auto

import { Meal, MealEntity } from '@/models';
import { streamToBuffer } from '@/utils';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const getBlockBlobClient = () => {
    const connectionString = process.env.STORAGE_ACCOUNT_CONNECTION_STRING!;
    const containerName = 'data';
    const blobName = "meals.json";

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    return blockBlobClient;
}

const getBlobContent = async () => {
    const blockBlobClient = getBlockBlobClient();
    const response = await blockBlobClient.download();

    if (response.errorCode) throw new Error(response.errorCode);

    if (!response.readableStreamBody) throw new Error('No readable stream');

    const downloaded = await streamToBuffer(response.readableStreamBody);

    if (!downloaded) { throw new Error('No downloaded content'); }

    return JSON.parse(downloaded.toString()) as MealEntity[];
}

export async function GET(request: Request) {
    const data = await getBlobContent();

    return Response.json([...data.reverse()]);
}

export async function POST(request: Request, response: Response) {
    const newMeal = await request.json() as Meal;

    const data = await getBlobContent();

    data.push({
        id: uuidv4(),
        name: newMeal.name,
        ingredients: newMeal.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredient.id,
            amount: ingredient.amount,
        })),
    });

    const blockBlobClient = getBlockBlobClient();

    const json = JSON.stringify(data, null, 4);

    await blockBlobClient.upload(json, Buffer.byteLength(json));

    return Response.json(newMeal);
}
