export async function toText(res, charset) {
    if (charset) {
        const buffer = await res.arrayBuffer();
        return new TextDecoder(charset).decode(buffer);
    } else {
        return await res.text();
    }
}
