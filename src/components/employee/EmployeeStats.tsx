'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from '@/lib/types';

interface EmployeeStatsProps {
  employee: Employee;
}

export function EmployeeStats({ employee }: EmployeeStatsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={employee.avatar} />
          <AvatarFallback>{employee.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{employee.name}</CardTitle>
          <div className="text-sm text-muted-foreground">{employee.email}</div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Chats</div>
            <div className="text-2xl font-bold">{employee.stats.totalChats}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
            <div className="text-2xl font-bold">{employee.stats.avgResponseTime}m</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Customers Helped</div>
            <div className="text-2xl font-bold">{employee.stats.customersHelped}</div>
          </div>
        </div>

        {/* Recent Actions */}
        <div>
          <h3 className="text-sm font-medium mb-3">Recent Actions</h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {employee.actions.map((action) => (
                <div
                  key={action.id}
                  className="flex flex-col gap-1 p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {action.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(action.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
} 