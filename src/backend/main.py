from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from typing import Dict, List, Union, Optional
import io

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def calculate_column_stats(df: pd.DataFrame, column: str) -> Dict:
    """Calcula estadísticas detalladas para una columna específica."""
    series = df[column]
    stats = {
        "name": column,
        "dataType": str(series.dtype),
        "nullCount": int(series.isnull().sum()),
        "uniqueCount": int(series.nunique())
    }
    
    # Estadísticas adicionales para columnas numéricas
    if pd.api.types.is_numeric_dtype(series):
        stats.update({
            "min": float(series.min()) if not pd.isna(series.min()) else None,
            "max": float(series.max()) if not pd.isna(series.max()) else None,
            "mean": float(series.mean()) if not pd.isna(series.mean()) else None,
            "median": float(series.median()) if not pd.isna(series.median()) else None,
            "mode": float(series.mode().iloc[0]) if not series.mode().empty else None
        })
    else:
        stats["mode"] = str(series.mode().iloc[0]) if not series.mode().empty else None
    
    return stats

def analyze_dataset(df: pd.DataFrame) -> Dict:
    """Analiza el dataset completo y genera todas las métricas necesarias."""
    total_rows = len(df)
    total_columns = len(df.columns)
    
    # Análisis de valores nulos
    null_values = []
    for column in df.columns:
        null_count = df[column].isnull().sum()
        if null_count > 0:
            null_values.append({
                "column": column,
                "count": int(null_count),
                "percentage": round((null_count / total_rows) * 100, 2)
            })
    
    # Análisis de tipos de datos
    data_types = []
    for column in df.columns:
        invalid_count = 0
        if pd.api.types.is_numeric_dtype(df[column]):
            type_name = "integer" if pd.api.types.is_integer_dtype(df[column]) else "float"
        elif pd.api.types.is_datetime64_dtype(df[column]):
            type_name = "date"
        elif pd.api.types.is_bool_dtype(df[column]):
            type_name = "boolean"
        else:
            type_name = "string"
        
        data_types.append({
            "column": column,
            "type": type_name,
            "invalidCount": invalid_count
        })
    
    # Análisis de outliers
    outliers = []
    for column in df.select_dtypes(include=[np.number]).columns:
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        outlier_mask = (df[column] < (Q1 - 1.5 * IQR)) | (df[column] > (Q3 + 1.5 * IQR))
        outlier_values = df[column][outlier_mask]
        
        if len(outlier_values) > 0:
            outliers.append({
                "column": column,
                "count": len(outlier_values),
                "values": outlier_values.tolist()
            })
    
    # Calcular métricas de calidad
    total_cells = total_rows * total_columns
    null_cells = sum(nv["count"] for nv in null_values)
    duplicate_rows = df.duplicated().sum()
    
    completeness = 1 - (null_cells / total_cells)
    consistency = 1 - (duplicate_rows / total_rows)
    accuracy = 1 - (sum(dt["invalidCount"] for dt in data_types) / total_cells)
    overall = (completeness + consistency + accuracy) / 3
    
    # Estadísticas por columna
    column_stats = [calculate_column_stats(df, column) for column in df.columns]
    
    return {
        "stats": {
            "totalRows": total_rows,
            "totalColumns": total_columns,
            "nullValues": null_values,
            "duplicateRows": int(duplicate_rows),
            "dataTypes": data_types,
            "outliers": outliers
        },
        "qualityScore": {
            "completeness": float(completeness),
            "accuracy": float(accuracy),
            "consistency": float(consistency),
            "overall": float(overall)
        },
        "columnStats": column_stats
    }

@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        
        # Detectar formato y leer archivo
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.StringIO(content.decode('utf-8')))
        elif file.filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(io.BytesIO(content))
        elif file.filename.endswith('.json'):
            df = pd.read_json(io.StringIO(content.decode('utf-8')))
        else:
            raise HTTPException(
                status_code=400, 
                detail="Formato no soportado. Use CSV, Excel o JSON"
            )
        
        # Analizar dataset
        result = analyze_dataset(df)
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
