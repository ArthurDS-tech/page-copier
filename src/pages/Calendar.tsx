import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Calendar as CalendarIcon, Clock, Users, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const events = [
  {
    id: '1',
    title: 'Reunião de Alinhamento',
    time: '09:00 - 10:00',
    type: 'meeting',
    attendees: 5,
    location: 'Sala 1',
    color: 'bg-primary',
  },
  {
    id: '2',
    title: 'Análise de Métricas',
    time: '14:00 - 15:30',
    type: 'analysis',
    attendees: 3,
    location: 'Online',
    color: 'bg-success',
  },
  {
    id: '3',
    title: 'Treinamento IA',
    time: '16:00 - 17:00',
    type: 'training',
    attendees: 8,
    location: 'Auditório',
    color: 'bg-warning',
  },
];

const upcomingEvents = [
  {
    id: '4',
    title: 'Review Semanal',
    date: '15 Nov',
    time: '10:00',
    type: 'review',
    color: 'bg-primary',
  },
  {
    id: '5',
    title: 'Demo para Cliente',
    date: '16 Nov',
    time: '14:00',
    type: 'demo',
    color: 'bg-success',
  },
  {
    id: '6',
    title: 'Planejamento Sprint',
    date: '18 Nov',
    time: '09:00',
    type: 'planning',
    color: 'bg-warning',
  },
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const currentMonth = 'Novembro 2025';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(13);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Calendário</h1>
                <p className="text-muted-foreground">Gerencie seus eventos e compromissos</p>
              </div>
              <Button>
                <CalendarIcon className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">{currentMonth}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2; // Start from day 1 on Wednesday
                    const isCurrentDay = day === selectedDate;
                    const isToday = day === 13;
                    const hasEvent = [13, 15, 16, 18].includes(day);
                    
                    if (day < 1 || day > 30) {
                      return <div key={i} className="aspect-square"></div>;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(day)}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all hover:bg-muted relative ${
                          isCurrentDay ? 'bg-primary text-primary-foreground' : 
                          isToday ? 'bg-primary/10 text-primary' : 
                          'text-foreground'
                        }`}
                      >
                        {day}
                        {hasEvent && (
                          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-current"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Today's Events */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Eventos de Hoje</h3>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.id} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className={`w-1 rounded-full ${event.color}`}></div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-foreground">{event.title}</h4>
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.attendees}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Resumo</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Eventos Hoje</span>
                        <span className="text-lg font-bold text-foreground">3</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Esta Semana</span>
                        <span className="text-lg font-bold text-foreground">12</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Este Mês</span>
                        <span className="text-lg font-bold text-foreground">45</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Próximos Eventos</h3>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                        <div className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center flex-shrink-0`}>
                          <CalendarIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm truncate">{event.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
