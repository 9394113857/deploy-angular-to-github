import { Component, OnInit, OnDestroy } from '@angular/core';
import { DjangoService } from '../django.service';
import { interval, Subscription, throwError } from 'rxjs';
import { switchMap, catchError, delayWhen } from 'rxjs/operators';

interface Task {
  id?: number | null;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-django',
  templateUrl: './django.component.html',
  styleUrls: ['./django.component.css']
})
export class DjangoComponent implements OnInit, OnDestroy {
  formHeader: string = "Add Task";
  tasks: Task[] | undefined;
  title: string = "";
  description: string = "";
  completed: boolean = false;
  showForm: boolean = false;
  id: number | null = null;

  private refreshSubscription: Subscription | undefined;

  constructor(private taskService: DjangoService) {}

  ngOnInit(): void {
    this.getTasks();
    this.setupDataRefresh();
  }

  private setupDataRefresh() {
    const refreshIntervalMs = 60000; // 60,000 milliseconds = 60 seconds = 1 minute
    let disconnected = false;

    this.refreshSubscription = interval(refreshIntervalMs)
      .pipe(
        switchMap(() => {
          if (disconnected) {
            return throwError('Disconnected from server');
          }
          return this.taskService.fetchTasks().pipe(
            catchError(() => {
              disconnected = true;
              return throwError('Disconnected from server');
            })
          );
        }),
        delayWhen(data => {
          if (disconnected) {
            return interval(refreshIntervalMs); // Try to reconnect every interval
          }
          return interval(0); // Immediate retry if no disconnection occurred
        })
      )
      .subscribe(
        (data: Task[]) => {
          this.tasks = data;
          disconnected = false; // Reconnected successfully
        },
        (error: any) => {
          console.log('Error fetching tasks:', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getTasks() {
    this.taskService.fetchTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        if (!this.hasData()) {
          this.showForm = true;
        }
      },
      (error: any) => {
        console.log("Error fetching tasks:", error);
      }
    );
  }

  deleteTask(id: number | null) {
    if (id !== null) {
      this.taskService.deleteTask(id).subscribe(
        (res: any) => {
          this.getTasks();
        },
        (error: any) => {
          console.log("Error deleting task:", error);
        }
      );
    } else {
      console.log("Invalid ID provided for deletion");
    }
  }

  openForm(data: Task | null = null) {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.title = data.title;
      this.description = data.description;
      this.completed = data.completed;
      this.id = data.id !== undefined ? data.id : null;
      this.formHeader = "Edit Task";
    } else {
      this.id = null;
      this.formHeader = "Add Task";
    }
  }

  closeForm() {
    this.showForm = false;
    this.clearForm();
  }

  clearForm() {
    this.title = "";
    this.description = "";
    this.completed = false;
    this.id = null;
  }

  saveTask() {
    this.showForm = false;
    let body: Task = {
      title: this.title,
      description: this.description,
      completed: this.completed
    };

    if (this.id !== null) {
      body.id = this.id;
      this.taskService.putTask(this.id, body).subscribe(
        (res) => {
          this.getTasks();
        },
        (error) => {
          console.log("Error updating task:", error);
        }
      );
    } else {
      this.taskService.postTask(body).subscribe(
        (res) => {
          this.getTasks();
        },
        (error) => {
          console.log("Error adding task:", error);
        }
      );
    }
  }

  hasData(): boolean {
    return this.tasks !== undefined && this.tasks.length > 0;
  }

  hasError(): boolean {
    return this.tasks === undefined;
  }


}
