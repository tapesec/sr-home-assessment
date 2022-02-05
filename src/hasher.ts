import { createHash } from "crypto";


const hash = (data: string) => {
    if (data !== undefined) {
        return createHash("sha256").update(data).digest("hex");
    }
    return "";
}

export type Hasher = (s: string) => string;
export default hash;