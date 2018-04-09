export class Product {
  readonly title: string = '';
  readonly description: string = '';

  constructor(
    fields?: {
      title?: string,
      description?: string,
    },
  ) {
    this.title = fields.title;
    this.description = fields.description;
  }
}
