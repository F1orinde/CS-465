export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;     // keep as string for JSON safety
  resort: string;
  perPerson: number;
  image: string;     // e.g. "images/kayak.jpg"
  description: string;
}
