export interface Props {
    searchParams: { name?: string };
}

export interface SearchResult {
    success: boolean;
    data?: MerchantData[];
    error?: string;
    statusCode?: number;
}