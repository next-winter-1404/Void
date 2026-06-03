export interface HouseQueryParams {
  page?: number;
  limit?: number;

  transactionType?: "mortgage" | "rental" | "reservation" | "direct purchase";

  search?: string;
  location?: string;

  order?: "ASC" | "DESC";
  sort?: "last_updated" | "price" | "area" | "created_at";

  minPrice?: number;
  maxPrice?: number;

  minRent?: number;
  maxRent?: number;

  minMortgage?: number;
  maxMortgage?: number;

  minArea?: number;
  maxArea?: number;
}