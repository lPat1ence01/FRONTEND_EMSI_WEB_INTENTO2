import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  number: number;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  description?: string;
  color?: string;
  location?: string;
  attendees?: string[];
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  selectedDay: CalendarDay | null = null;
  newEvent: Partial<CalendarEvent> = {};
  showEventModal: boolean = false;
  eventColors: string[] = ['#3f51b5', '#ff5722', '#4caf50', '#9c27b0', '#2196f3', '#607d8b'];
  viewMode: 'month' | 'week' | 'day' = 'month';
  
  weekDays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  calendarDays: CalendarDay[] = [];
  
  get currentMonthName(): string {
    return this.currentDate.toLocaleString('es-ES', { month: 'long' });
  }

  get currentMonthNameWithYear(): string {
    return `${this.currentMonthName} ${this.currentYear}`;
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    // Días del mes anterior
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInLastMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({
        number: daysInLastMonth - startingDayOfWeek + i + 1,
        inMonth: false,
        isToday: false,
        isSelected: false,
        events: []
      });
    }
    
    // Días del mes actual
    const today = new Date();
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const isToday = i === today.getDate() && 
                     this.currentMonth === today.getMonth() && 
                     this.currentYear === today.getFullYear();
      
      this.calendarDays.push({
        number: i,
        inMonth: true,
        isToday: isToday,
        isSelected: false,
        events: this.generateRandomEvents(i)
      });
    }
    
    // Días del próximo mes
    const totalDays = this.calendarDays.length;
    const remainingDays = 42 - totalDays;
    
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push({
        number: i,
        inMonth: false,
        isToday: false,
        isSelected: false,
        events: []
      });
    }
  }

  generateRandomEvents(day: number): CalendarEvent[] {
    if (day % 3 === 0 || day % 5 === 0) {
      const count = day % 4 + 1;
      const events: CalendarEvent[] = [];
      const locations = ['Oficina Central', 'Sala de Reuniones', 'Zoom', 'Cliente', 'Cafetería'];
      const attendees = ['Juan Pérez', 'María Gómez', 'Carlos López', 'Ana Rodríguez', 'Pedro Sánchez'];
      
      for (let i = 0; i < count; i++) {
        const randomAttendees = [...attendees].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
        
        events.push({
          id: `${day}-${i}-${Math.random().toString(36).substr(2, 5)}`,
          title: `Evento ${this.getEventType(i)}`,
          time: `${8 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '00' : '30'}`,
          description: `Descripción del evento ${this.getEventType(i)}`,
          color: this.eventColors[i % this.eventColors.length],
          location: locations[Math.floor(Math.random() * locations.length)],
          attendees: randomAttendees
        });
      }
      
      return events;
    }
    return [];
  }

  getEventType(index: number): string {
    const types = ['Reunión', 'Llamada', 'Taller', 'Presentación', 'Revision', 'Entrevista'];
    return types[index % types.length];
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
    this.selectedDay = null;
  }

  selectDay(day: CalendarDay): void {
    this.calendarDays.forEach(d => d.isSelected = false);
    day.isSelected = true;
    this.selectedDay = day;
  }

  openAddEvent(): void {
    if (this.selectedDay) {
      this.newEvent = {
        title: '',
        time: '12:00',
        color: this.eventColors[0],
        location: '',
        attendees: []
      };
      this.showEventModal = true;
    }
  }

  addEvent(): void {
    if (this.selectedDay && this.newEvent.title && this.newEvent.time) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: this.newEvent.title!,
        time: this.newEvent.time!,
        description: this.newEvent.description,
        color: this.newEvent.color,
        location: this.newEvent.location,
        attendees: this.newEvent.attendees || []
      };
      this.selectedDay.events.push(event);
      this.showEventModal = false;
      this.newEvent = {};
    }
  }

  deleteEvent(eventId: string): void {
    if (this.selectedDay) {
      this.selectedDay.events = this.selectedDay.events.filter(e => e.id !== eventId);
    }
  }

  setViewMode(mode: 'month' | 'week' | 'day'): void {
    this.viewMode = mode;
    // Implementar lógica para cambiar vista
  }
}