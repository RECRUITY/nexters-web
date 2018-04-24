export interface IFileResponse {
    _id?: string,
    name?: string,
    image?: boolean,
    thumb?: { fileId: string },
}

export class File {
    readonly thumb: { fileId: string };
    readonly id: string;
    readonly name: string;
    readonly image: boolean;

    constructor(
        fields?: IFileResponse
    ) {
        if (fields) {
            this.id = fields._id;
            this.name = fields.name;
            this.image = fields.image;
            this.thumb = fields.thumb;
        }
    }
}
