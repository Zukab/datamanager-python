# Imagen base
FROM python:3.9-slim

# Directorio de trabajo
WORKDIR /app

# Copiar requirements.txt
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY ./src/backend ./src/backend

# Exponer el puerto
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "src.backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
