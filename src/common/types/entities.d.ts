// Base interface that matches MainTable (abstract class in Java)
export interface MainTable {
  PK: string;                    // @DynamoDBHashKey
  SK: string;                    // @DynamoDBRangeKey
  id: number;                    // @DynamoDBAttribute
  status: string;                // @DynamoDBAttribute
  gIndex2Pk: string;             // @DynamoDBAttribute (used as GSI_Email HashKey in Client)
  createdDate: string;           // LocalDateTime serialized as ISO string
}

// Client interface that matches ClientDynamoEntity extends MainTable
export interface ClientDynamoEntity extends MainTable {
  // Client-specific attributes
  name: string;                  // @DynamoDBAttribute
  surname: string;               // @DynamoDBAttribute  
  cifNifNie: string;             // @DynamoDBAttribute
  phone: string;                 // @DynamoDBAttribute
  email: string;                 // @DynamoDBAttribute
  age: string;                   // @DynamoDBAttribute
  
  // GSI for efficient searching by name
  gsiPk: string;                 // @DynamoDBIndexHashKey(GSI_Name) - constant "CLIENT#"
  gsiName: string;               // @DynamoDBIndexRangeKey(GSI_Name) - name in lowercase
  
  // Note: gIndex2Pk (inherited from MainTable) is used as @DynamoDBIndexHashKey(GSI_Email)
}

// Alias for backward compatibility
export interface Client extends ClientDynamoEntity {}

// DTOs que coinciden con tu ClientController
export interface ClientInputDto {
  name: string;
  surname: string;
  cifNifNie: string;
  phone: string;
  email: string;
  age: string;
}

export interface ClientInputRegisterDto{
  name: string;
  surname: string;
  cifNifNie: string;
  phone: string;
  email: string;
  age: string;
  password: string; // Añadido para el registro
}

export interface ClientInputLoginDto {
  email: string;
  password: string; // Añadido para el login
}

export interface ClientOutputLoginDto {
  name: string;
  surname: string;
  message: string;
}

export interface ClientOutputDto {
  id: number;
  name: string;
  surname: string;
  cifNifNie: string;
  phone: string;
  email: string;
  age: string;
  // Añade otros campos que tengas en tu ClientOutputDto real
  status?: string;
  createdDate?: string;
}

export interface ClientSimpleOutputDto {
  id: number;
}

// Alias para compatibilidad hacia atrás
export interface CreateClientRequest extends ClientInputDto {}
export interface UpdateClientRequest extends ClientInputDto {}
export interface ClientResponse extends ClientOutputDto {}

// Merchant Type enum (matches Java MerchantType)
export enum MerchantType {
  MERCHANT_TYPE_PERSONAL_SERVICES = "MERCHANT_TYPE_PERSONAL_SERVICES",
  MERCHANT_TYPE_FINANCIAL_SERVICES = "MERCHANT_TYPE_FINANCIAL_SERVICES"
}

// Merchant interface that matches MerchantDynamoEntity extends MainTable
export interface MerchantDynamoEntity extends MainTable {
  // Merchant-specific attributes
  name: string;                  // @DynamoDBAttribute
  address: string;               // @DynamoDBAttribute
  merchantType: MerchantType;    // @DynamoDBAttribute with MerchantTypeConverter
  
  // GSI for efficient searching by name
  gsiPk: string;                 // @DynamoDBIndexHashKey(GSI_Name) - constant "MERCHANT#"
  gsiName: string;               // @DynamoDBIndexRangeKey(GSI_Name) - name in lowercase
  
  // Note: gIndex2Pk (inherited from MainTable) is used as @DynamoDBIndexHashKey(GSI_Email)
}

// Alias for backward compatibility
export interface Merchant extends MerchantDynamoEntity {}

// DTOs que coinciden con tu MerchantController
export interface MerchantInputDto {
  clientId?: number;            // Si es necesario en tu DTO
  name: string;
  address: string;
  merchantType: MerchantType;   // Enum value
}

export interface MerchantOutputDto {
  id: number;
  clientId: number;
  name: string;
  address: string;
  merchantType: MerchantType;
  // Añade otros campos que tengas en tu MerchantOutputDto real
  status?: string;
  createdDate?: string;
}

export interface MerchantOutputIdDto {
  id: number;
}

export interface MerchantInputUpdateDto {
  name?: string;
  address?: string;
  merchantType?: string;        // String que luego se convierte a enum en el controller
}

// Alias para compatibilidad hacia atrás
export interface CreateMerchantRequest extends MerchantInputDto {}
export interface UpdateMerchantRequest extends MerchantInputUpdateDto {}
export interface MerchantResponse extends MerchantOutputDto {}

// Common API response wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Health check response
export interface HealthResponse {
  status: string;
  message: string;
}
