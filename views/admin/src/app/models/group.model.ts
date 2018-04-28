import { File, IFileResponse } from './file.model';

export class Group {
  readonly id: string = '';
  readonly name: string = '';
  readonly file: File = new File();

  constructor(
    fields?: {
      _id?: string,
      name?: string,
      file?: IFileResponse,
    },
  ) {
    if (fields) {
      this.id = fields._id;
      this.name = fields.name;
      this.file = new File(fields.file);
    }
  }

  hasImage() {
    return this.file.id && this.file.image;
  }
}
