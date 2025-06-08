export interface ICategory{
    _id: string;
  name: string;
  slug?: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  parent: string | null;
  children: ICategory[];
}
