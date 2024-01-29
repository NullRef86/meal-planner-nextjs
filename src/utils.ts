import { put } from "@vercel/blob";

export async function streamToBuffer(readableStream: NodeJS.ReadableStream) {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];

        readableStream.on('data', (data) => {
            const content: Buffer = data instanceof Buffer ? data : Buffer.from(data);
            chunks.push(content);
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

export const getBlobContent = async<T>(filename: string) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        const response = await fetch(
            `https://wkgafazl6buri7p4.public.blob.vercel-storage.com/${filename}`,
            {
                headers: myHeaders,
            }
        );

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json() as T[];

        console.log(`BLOB DATA for ${filename}`, data);

        return data;
    }
    catch (e) {
        console.log(e);
        return [] as T[];
    }
}
export const saveBlobContent = async<T>(filename: string, data: T[]) => {
    const json = JSON.stringify(data, null, 4);
    await put(
        filename,
        json,
        {
            access: 'public',
            addRandomSuffix: false,
            cacheControlMaxAge: 0
        }
    );
}
