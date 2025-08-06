export interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface SearchResult {
    success: boolean;
    data?: MerchantData;
    error?: string;
    statusCode?: number;
}