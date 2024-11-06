# Data Quality Dashboard

Una aplicación web moderna para analizar la calidad de datos en archivos CSV, Excel y JSON. Proporciona métricas detalladas sobre la completitud, consistencia y precisión de los datos.

## 🚀 Características

- **Análisis Completo de Datos**
  - Detección de valores nulos y duplicados
  - Identificación de outliers
  - Estadísticas por columna
  - Métricas de calidad global

- **Soporte Multi-formato**
  - CSV
  - Excel (.xlsx, .xls)
  - JSON

- **Métricas de Calidad**
  - Completitud
  - Consistencia
  - Precisión
  - Puntuación global

## 🛠️ Tecnologías

### Frontend
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Vite

### Backend
- FastAPI
- Pandas
- NumPy
- Docker

## 📊 Ejemplo de Uso

1. Accede a la aplicación
2. Sube tu archivo de datos (CSV, Excel o JSON)
3. Obtén un análisis detallado con:
   - Estadísticas generales
   - Detección de anomalías
   - Visualización de datos

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v18+)
- Python (3.9+)
- Docker

### Instalación

1. **Frontend**
```bash
npm install
npm run dev
```

2. **Backend**
```bash
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.backend.main:app --reload
```

3. **Docker**
```bash
docker-compose up --build
```

## 📝 API Endpoints

### POST /analyze
Analiza un archivo y retorna métricas detalladas.

```python
# Ejemplo de respuesta
{
  "stats": {
    "totalRows": 1000,
    "totalColumns": 8,
    "nullValues": [...],
    "duplicateRows": 12,
    "dataTypes": [...],
    "outliers": [...]
  },
  "qualityScore": {
    "completeness": 0.975,
    "accuracy": 0.982,
    "consistency": 0.968,
    "overall": 0.975
  },
  "columnStats": [...]
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

# Estructura del Proyecto

📦 Data-Quality-Dashboard
┣ 📂 src
┃ ┣ 📂 backend
┃ ┃ ┣ 📜 main.py            # API endpoints y lógica principal
┃ ┃ ┣ 📜 utils.py           # Funciones de utilidad para análisis
┃ ┃ ┗ 📜 __init__.py
┃ ┣ 📂 components
┃ ┃ ┣ 📜 data-quality-dashboard.tsx  # Componente principal del dashboard
┃ ┃ ┣ 📜 file-upload.tsx            # Componente de carga de archivos
┃ ┃ ┗ 📜 ui/                        # Componentes UI reutilizables
┃ ┣ 📜 App.tsx              # Componente raíz de React
┃ ┣ 📜 main.tsx            # Punto de entrada de React
┃ ┗ 📜 config.ts           # Configuración de la aplicación
┣ 📜 .env                  # Variables de entorno
┣ 📜 .gitignore           # Archivos ignorados por git
┣ 📜 docker-compose.yml   # Configuración de Docker
┣ 📜 Dockerfile          # Configuración de imagen Docker
┣ 📜 package.json        # Dependencias de Node.js
┣ 📜 requirements.txt    # Dependencias de Python
┗ 📜 README.md           # Documentación del proyecto

### Descripción de los Componentes Principales:

1. **Backend (`/src/backend/`)**:
   - `main.py`: API FastAPI con endpoints para análisis de datos
   - `utils.py`: Funciones de análisis estadístico y procesamiento

2. **Frontend (`/src/`)**:
   - `components/`: Componentes React reutilizables
   - `App.tsx`: Lógica principal de la aplicación
   - `config.ts`: Configuración y variables de entorno

3. **Configuración**:
   - `docker-compose.yml`: Orquestación de servicios
   - `Dockerfile`: Construcción de imagen Docker
   - `requirements.txt`: Dependencias Python
   - `package.json`: Dependencias Node.js

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👤 Autor

Sebastian Quintero
- GitHub: [@Zukab](https://github.com/Zukab/)
- LinkedIn: [Sebastian Quintero](https://www.linkedin.com/in/juan-sebastian-quintero-fernandez-35b514255/)