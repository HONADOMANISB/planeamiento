import { Component } from '@angular/core';
import { CronogramaService } from '@services/ceplan/cronograma.service';
import { finalize } from "rxjs";
interface Event {
  date: Date;
  title: string;
  description: string;
}
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  weeks: number[][] = [];
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  events:[] = [];
  listEvent:any=[
    {
      title:'',
      date:'',
      description:''
    }
  ]
  loading : boolean=false

  constructor( private Cronograma$: CronogramaService,){}
  ngOnInit() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.listarEventos()
  }
  generateCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayCounter = 1;
    this.weeks = [];

    for (let week = 0; week < 6; week++) {
      const days: number[] = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDay || dayCounter > daysInMonth) {
          days.push(0);
        } else {
          days.push(dayCounter++);
        }
      }
      this.weeks.push(days);
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
 

    public listarEventos() {
      this.loading = true;
      this.Cronograma$.listarEventos()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(({ estado, datos }) => {        
           this.listEvent=datos
          
          
        });
    }

    isEventOnDay(day: number, month: number, year: number, events: Event[]): Event[] {
      return events.filter(event => {
        console.log(event.date)
        const eventDate = new Date(event.date);
        const eventDay = eventDate.getDate()+1; // Extrae el día
        const eventMonth = eventDate.getMonth(); // Extrae el mes
        const eventYear = eventDate.getFullYear(); // Extrae el año
        console.log(eventDay+'/'+eventMonth)
    
        // Compara el día, mes y año del evento con el día, mes y año actuales
        return eventDay === day && eventMonth === month && eventYear === year;
      });
    }

}
