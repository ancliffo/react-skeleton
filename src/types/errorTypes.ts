// Create a custom error type
export interface ValidationError extends Error {
  statusCode: number;
  validationErrors?: Record<string, string>;
}
