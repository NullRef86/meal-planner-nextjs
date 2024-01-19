
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

