export interface Book {
  id: string;
  etag: string;
  volumeInfo: {
    title: string;
    averageRating: number;
    pageCount: number;
    authors: Array<string>;
  };
}
