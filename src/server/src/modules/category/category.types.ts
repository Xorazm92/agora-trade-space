export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    icon?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
    createdAt: Date;
    updatedAt: Date;
}