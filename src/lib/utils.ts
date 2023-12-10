import {writeFile} from "fs/promises";

export async function savefile(path: string, buffer: Buffer) {
    await writeFile(path, buffer)
        .catch((e) => {
            throw e;
        });
}

