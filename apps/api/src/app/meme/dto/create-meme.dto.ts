import { MemeToGenerate } from "apps/api/src/assets/lib/api-interface/api-interfaces";

export class CreateMemeDto implements MemeToGenerate {

    meme: string;
    text0: {
        text: string;
        font_size?: number;
        font?: string;
    }
    text1: {
        text: string;
        font_size?: number;
        font?: string;
    }
}
