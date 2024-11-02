from typing import Dict, List, Union, Optional
import pandas as pd
import numpy as np
from scipy import stats

def calculate_quality_metrics(df: pd.DataFrame) -> Dict:
    """Calcula las métricas de calidad del dataset."""
    total_cells = df.size
    null_cells = df.isnull().sum().sum()
    
    # NO NULLS  
    completeness = 1 - (null_cells / total_cells)
    
    # DUPLICATES
    duplicate_rows = df.duplicated().sum()
    consistency = 1 - (duplicate_rows / len(df))
    
    # OUTLIERS
    accuracy = 0
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    if len(numeric_cols) > 0:
        outliers_score = []
        for col in numeric_cols:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            outliers = ((df[col] < (Q1 - 1.5 * IQR)) | (df[col] > (Q3 + 1.5 * IQR))).sum()
            outliers_score.append(1 - (outliers / len(df)))
        accuracy = np.mean(outliers_score)
    

    overall = np.mean([completeness, consistency, accuracy])
    
    return {
        "completeness": float(completeness),
        "consistency": float(consistency),
        "accuracy": float(accuracy),
        "overall": float(overall)
    }

def analyze_column(series: pd.Series) -> Dict:
    """Analiza una columna individual del dataset."""
    stats = {
        "name": series.name,
        "dataType": str(series.dtype),
        "nullCount": int(series.isnull().sum()),
        "uniqueCount": int(series.nunique()),
    }
    
    if pd.api.types.is_numeric_dtype(series):
        stats.update({
            "min": float(series.min()) if not pd.isna(series.min()) else None,
            "max": float(series.max()) if not pd.isna(series.max()) else None,
            "mean": float(series.mean()) if not pd.isna(series.mean()) else None,
            "median": float(series.median()) if not pd.isna(series.median()) else None,
            "mode": float(series.mode().iloc[0]) if not series.mode().empty else None
        })
    
    return stats

def detect_outliers(df: pd.DataFrame) -> List[Dict]:
    """Detecta outliers en columnas numéricas usando el método IQR."""
    outliers = []
    for column in df.select_dtypes(include=[np.number]).columns:
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        outlier_mask = (df[column] < (Q1 - 1.5 * IQR)) | (df[column] > (Q3 + 1.5 * IQR))
        outlier_values = df[column][outlier_mask]
        
        if len(outlier_values) > 0:
            outliers.append({
                "column": str(column),
                "count": int(len(outlier_values)),
                "values": outlier_values.tolist()
            })
    
    return outliers

def analyze_dataset(df: pd.DataFrame) -> Dict:
    """Análisis completo del dataset."""
    total_rows = len(df)
    total_columns = len(df.columns)
    null_values = []
    for column in df.columns:
        null_count = df[column].isnull().sum()
        if null_count > 0:
            null_values.append({
                "column": str(column),
                "count": int(null_count),
                "percentage": round((null_count / total_rows) * 100, 2)
            })
    data_types = []
    for column in df.columns:
        invalid_count = 0
        dtype = df[column].dtype
        
        if pd.api.types.is_numeric_dtype(dtype):
            type_name = "numeric"
        elif pd.api.types.is_datetime64_dtype(dtype):
            type_name = "datetime"
        else:
            type_name = "string"
            
        data_types.append({
            "column": str(column),
            "type": type_name,
            "invalidCount": invalid_count
        })
    
    return {
        "stats": {
            "totalRows": total_rows,
            "totalColumns": total_columns,
            "nullValues": null_values,
            "duplicateRows": int(df.duplicated().sum()),
            "dataTypes": data_types,
            "outliers": detect_outliers(df)
        },
        "qualityScore": calculate_quality_metrics(df),
        "columnStats": [analyze_column(df[col]) for col in df.columns]
    }
