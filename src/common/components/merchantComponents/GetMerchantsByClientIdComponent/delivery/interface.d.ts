export interface Props {
  searchParams?: { clientId?: string };
}

export interface SearchResult {
    success: boolean;
    data?: MerchantData[];
    error?: string;
    statusCode?: number;
}
