import { File, IFileResponse } from './file.model';

export class Product {
  readonly id: string = '';
  readonly title: string = '';
  readonly description: string = '';
  readonly file: File = new File();

  constructor(
    fields?: {
      _id?: string,
      title?: string,
      description?: string,
      file?: IFileResponse,
    },
  ) {
    if (fields) {
      this.id = fields._id;
      this.title = fields.title;
      this.description = fields.description;
      this.file = new File(fields.file);
    }
  }

  hasImage() {
    return this.file.id && this.file.image;
  }
}
