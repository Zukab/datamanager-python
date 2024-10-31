import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, FileType, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const ALLOWED_TYPES = [
  'text/csv',
  'application/json',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

const ALLOWED_EXTENSIONS = ['.csv', '.json', '.xlsx', '.xls'];

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidType = ALLOWED_TYPES.includes(file.type) || 
                       ALLOWED_EXTENSIONS.includes(fileExtension);

    if (!isValidType) {
      toast({
        title: 'Formato no soportado',
        description: 'Por favor, sube archivos CSV, Excel (.xlsx, .xls) o JSON.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, toast]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, toast]
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileType className="h-6 w-6" />
          Cargar Dataset
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'relative rounded-lg border-2 border-dashed p-8 text-center transition-all',
            dragActive
              ? 'border-primary bg-muted/50'
              : 'border-muted-foreground/25',
            isLoading && 'opacity-50 pointer-events-none'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv,.json,.xlsx,.xls"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            disabled={isLoading}
          />
          <div className="flex flex-col items-center gap-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium">
                Arrastra tu archivo aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted-foreground">
                Soporta archivos CSV, Excel (.xlsx, .xls) y JSON hasta 100MB
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">.CSV</Badge>
              <Badge variant="secondary">.XLSX</Badge>
              <Badge variant="secondary">.XLS</Badge>
              <Badge variant="secondary">.JSON</Badge>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Analizando datos...
            </div>
            <Progress value={33} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}