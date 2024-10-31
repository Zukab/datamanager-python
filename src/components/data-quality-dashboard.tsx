import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DatasetStats, DataQualityScore, ColumnStats } from '@/lib/types';
import { FileCheck, AlertTriangle, Ban } from 'lucide-react';

interface DataQualityDashboardProps {
  stats?: DatasetStats;
  qualityScore?: DataQualityScore;
  columnStats?: ColumnStats[];
}

export function DataQualityDashboard({
  stats,
  qualityScore,
  columnStats,
}: DataQualityDashboardProps) {
  if (!stats || !qualityScore || !columnStats) return null;

  const nullValueData = stats.nullValues.map((item) => ({
    name: item.column,
    value: item.percentage,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calidad General</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(qualityScore.overall * 100).toFixed(1)}%
            </div>
            <Progress
              value={qualityScore.overall * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filas Duplicadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.duplicateRows}</div>
            <p className="text-xs text-muted-foreground">
              de {stats.totalRows} filas totales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valores Nulos</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.nullValues.reduce((acc, curr) => acc + curr.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              en {stats.nullValues.length} columnas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Valores Nulos por Columna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nullValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Columna</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Columna</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valores Únicos</TableHead>
                <TableHead>Valores Nulos</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columnStats.map((col) => (
                <TableRow key={col.name}>
                  <TableCell className="font-medium">{col.name}</TableCell>
                  <TableCell>{col.dataType}</TableCell>
                  <TableCell>{col.uniqueCount}</TableCell>
                  <TableCell>{col.nullCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={col.nullCount === 0 ? 'default' : 'destructive'}
                    >
                      {col.nullCount === 0 ? 'Completo' : 'Incompleto'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}