export interface IResponse {
  Type: number;
  Message: string;
  Promoted: any[];
  Data: BlogModel[];
  RateLimit: any;
  HasWarning: boolean;
}

export interface BlogModel {
  id: string;
  guid: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  source: string;
  body: string;
  tags: string;
  categories: string;
  upvotes: string;
  downvotes: string;
  lang: string;
  source_info: SourceInfo;
}

export interface SourceInfo {
  name: string;
  lang: string;
  img: string;
}
