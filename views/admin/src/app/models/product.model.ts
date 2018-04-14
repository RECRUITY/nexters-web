export class Product {
  readonly id: string = '';
  readonly title: string = '';
  readonly description: string = '';

  constructor(
    fields?: {
      _id?: string,
      title?: string,
      description?: string,
    },
  ) {
    this.id = fields._id;
    this.title = fields.title;
    this.description = fields.description;
  }
}
