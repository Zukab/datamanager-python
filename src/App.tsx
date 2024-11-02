import { useState } from 'react';
import { FileUpload } from '@/components/file-upload';
import { DataQualityDashboard } from '@/components/data-quality-dashboard';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { DatasetStats, DataQualityScore, ColumnStats } from '@/lib/types';
import { Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { API_URL } from '@/config';

// Datos de ejemplo
const sampleStats: DatasetStats = {
  totalRows: 1000,
  totalColumns: 8,
  nullValues: [
    { column: 'edad', count: 25, percentage: 2.5 },
    { column: 'salario', count: 15, percentage: 1.5 },
    { column: 'ciudad', count: 5, percentage: 0.5 },
    { column: 'fecha_inicio', count: 30, percentage: 3.0 },
  ],
  duplicateRows: 12,
  dataTypes: [
    { column: 'edad', type: 'integer', invalidCount: 3 },
    { column: 'salario', type: 'float', invalidCount: 2 },
    { column: 'ciudad', type: 'string', invalidCount: 0 },
    { column: 'fecha_inicio', type: 'date', invalidCount: 5 },
  ],
  outliers: [
    { column: 'edad', count: 4, values: [95, 98, 99, 102] },
    { column: 'salario', count: 3, values: [150000, 160000, 180000] },
  ],
};

const sampleQualityScore: DataQualityScore = {
  completeness: 0.975,
  accuracy: 0.982,
  consistency: 0.968,
  overall: 0.975,
};

const sampleColumnStats: ColumnStats[] = [
  {
    name: 'edad',
    dataType: 'integer',
    nullCount: 25,
    uniqueCount: 75,
    min: 18,
    max: 102,
    mean: 42.5,
    median: 41,
    mode: 38,
  },
  {
    name: 'salario',
    dataType: 'float',
    nullCount: 15,
    uniqueCount: 850,
    min: 25000,
    max: 180000,
    mean: 65000,
    median: 62000,
    mode: 60000,
  },
  {
    name: 'ciudad',
    dataType: 'string',
    nullCount: 5,
    uniqueCount: 120,
    mode: 'Madrid',
  },
  {
    name: 'fecha_inicio',
    dataType: 'date',
    nullCount: 30,
    uniqueCount: 450,
    min: '2020-01-01',
    max: '2024-03-15',
  },
  {
    name: 'departamento',
    dataType: 'string',
    nullCount: 0,
    uniqueCount: 8,
    mode: 'Ventas',
  },
  {
    name: 'activo',
    dataType: 'boolean',
    nullCount: 0,
    uniqueCount: 2,
    mode: true,
  },
  {
    name: 'evaluacion',
    dataType: 'float',
    nullCount: 8,
    uniqueCount: 50,
    min: 1.0,
    max: 5.0,
    mean: 3.8,
    median: 4.0,
    mode: 4.0,
  },
  {
    name: 'codigo_empleado',
    dataType: 'string',
    nullCount: 0,
    uniqueCount: 1000,
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<DatasetStats>(sampleStats);
  const [qualityScore, setQualityScore] = useState<DataQualityScore>(sampleQualityScore);
  const [columnStats, setColumnStats] = useState<ColumnStats[]>(sampleColumnStats);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // TODO: Reemplazar con tu endpoint de backend
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al analizar el archivo');
      }

      const data = await response.json();
      setStats(data.stats);
      setQualityScore(data.qualityScore);
      setColumnStats(data.columnStats);

      toast({
        title: 'Análisis completado',
        description: 'Los datos han sido procesados exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un problema al analizar el archivo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Gestor de Calidad de Datos</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
        <DataQualityDashboard
          stats={stats}
          qualityScore={qualityScore}
          columnStats={columnStats}
        />
      </main>
      <Toaster />
    </div>
  );
}

export default App;