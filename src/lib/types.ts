export interface DatasetStats {
  totalRows: number;
  totalColumns: number;
  nullValues: {
    column: string;
    count: number;
    percentage: number;
  }[];
  duplicateRows: number;
  dataTypes: {
    column: string;
    type: string;
    invalidCount: number;
  }[];
  outliers: {
    column: string;
    count: number;
    values: number[];
  }[];
}

export interface ColumnStats {
  name: string;
  dataType: string;
  nullCount: number;
  uniqueCount: number;
  min?: number | string;
  max?: number | string;
  mean?: number;
  median?: number;
  mode?: string | number;
}

export interface DataQualityScore {
  completeness: number;
  accuracy: number;
  consistency: number;
  overall: number;
}