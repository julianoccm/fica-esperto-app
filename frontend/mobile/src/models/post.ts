export class Post {
  id?: number;
  title?: string;
  description?: string;
  content?: string;
  author?: string;
  imageUrl?: string;
  category?: string;

  constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): Post {
    return new Post({
      id: json.id,
      title: json.title,
      description: json.description,
      content: json.content,
      author: json.author,
      imageUrl: json.imageUrl,
      category: json.category,
    });
  }

  toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      content: this.content,
      author: this.author,
      imageUrl: this.imageUrl,
      category: this.category,
    };
  }
}
