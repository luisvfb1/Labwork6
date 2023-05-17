import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { FirebaseService } from '../services/firebase.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit{

  todos: any[] = [];
  editingItem: any = null;
  currentDate: string;
  isSignedIn = true;

  @Output() isLogout = new EventEmitter<void>()

  constructor(private todoService: TodoService, public firebaseService : FirebaseService){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    this.currentDate = today.toLocaleDateString('en-GB');
  }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item=>{
      
      this.todos = item.sort((a:any,b:any)=>{return a.isDone -b.isDone});
    })
  }

   onClick(titleInput: HTMLTextAreaElement){
    if(titleInput.value){
      this.todoService.addTodo(titleInput.value);
      titleInput.value = "";
    }  
}
  onStatusChange(id:string, newStaus:boolean){
    this.todoService.updateTodoStatus(id,newStaus);
  }
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }
  onEdit(item:any){
    this.editingItem = item;
  }
  onSave(item:any, newTitle:string){
    this.todoService.updateTitle(item.id, newTitle);
    this.editingItem = null;
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }
  showSearchBar(){

  }
  hideSearchBar(){
    
  }
}

 
