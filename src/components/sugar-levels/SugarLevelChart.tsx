'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SugarLevelReading {
  timestamp: string;
  value: number;
}

interface SugarLevelChartProps {
  readings: SugarLevelReading[];
}

export function SugarLevelChart({ readings }: SugarLevelChartProps) {
  const data = readings.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString([], { 
      hour: '2-digit',
      minute: '2-digit',
    }),
    value: reading.value,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sugar Level Readings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 