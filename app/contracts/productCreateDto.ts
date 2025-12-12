
export interface CreateProductInterface {
  title: string;
  price: number;
  body: string;
  category: string;   
  status: string;     
}

export interface EditProductDto {
  title: string;
  body: string;
  price: number | string;
  category: string;
  status: string;
}


