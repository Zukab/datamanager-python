```markdown
# Data Quality Dashboard

A modern web application to analyze data quality in CSV, Excel, and JSON files. It provides detailed metrics on completeness, consistency, and accuracy of the data.

## 🚀 Features

- **Comprehensive Data Analysis**
  - Detection of null and duplicate values
  - Identification of outliers
  - Column statistics
  - Global quality metrics

- **Multi-format Support**
  - CSV
  - Excel (.xlsx, .xls)
  - JSON

- **Quality Metrics**
  - Completeness
  - Consistency
  - Accuracy
  - Overall score

## 🛠️ Technologies

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

## 📊 Example Usage

1. Access the application.
2. Upload your data file (CSV, Excel, or JSON).
3. Get a detailed analysis with:
   - General statistics
   - Anomaly detection
   - Data visualization

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Docker

### Installation

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
Analyzes a file and returns detailed metrics.

```python
# Example response
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

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

# Project Structure

📦 Data-Quality-Dashboard  
  📂 src  
    📂 backend  
      📜 main.py            # API endpoints and core logic  
      📜 utils.py           # Utility functions for analysis  
      📜 __init__.py  
    📂 components  
      📜 data-quality-dashboard.tsx  # Main dashboard component  
      📜 file-upload.tsx            # File upload component  
      📜 ui/                        # Reusable UI components  
    📜 App.tsx              # Main React component  
    📜 main.tsx            # React entry point  
    📜 config.ts           # Application configuration  
  📜 .env                  # Environment variables  
  📜 .gitignore           # Files ignored by git  
  📜 docker-compose.yml   # Docker configuration  
  📜 Dockerfile           # Docker image build configuration  
  📜 package.json         # Node.js dependencies  
  📜 requirements.txt     # Python dependencies  
  📜 README.md            # Project documentation  

### Description of Main Components:

1. **Backend (`/src/backend/`)**:
   - `main.py`: FastAPI API with endpoints for data analysis
   - `utils.py`: Statistical analysis and processing functions

2. **Frontend (`/src/`)**:
   - `components/`: Reusable React components
   - `App.tsx`: Main application logic
   - `config.ts`: Configuration and environment variables

3. **Configuration**:
   - `docker-compose.yml`: Service orchestration
   - `Dockerfile`: Docker image build configuration
   - `requirements.txt`: Python dependencies
   - `package.json`: Node.js dependencies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👤 Author

Sebastian Quintero  
- GitHub: [@Zukab](https://github.com/Zukab/)  
- LinkedIn: [Sebastian Quintero](https://www.linkedin.com/in/juan-sebastian-quintero-fernandez-35b514255/)
