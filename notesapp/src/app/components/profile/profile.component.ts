import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  decoded: any;
  token: any;
  AllNotes: any = [];
  isLoading = false;
  noteId: any;
  constructor(private _Router: Router, private _NotesService: NotesService) {
    try {
      this.token = localStorage.getItem('TOKEN');
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }

    this.getAllMyNotes();

    if (!localStorage.getItem('TOKEN')) {
      this._Router.navigate(['/signin']);
    }
  }

  ngOnInit(): void {}

  getAllMyNotes() {
    let data = {
      token: this.token,
      userId: this.decoded._id,
    };
    this._NotesService.getAllNotes(data).subscribe((response) => {
      if (response.message == 'success') {
        this.isLoading = true;
        this.AllNotes = response.Notes;
      } else {
        localStorage.clear();
        this._Router.navigate(['/signin']);
      }
    });
  }

  addedNote = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });

  addNote() {
    let data = {
      title: this.addedNote.value.title,
      desc: this.addedNote.value.desc,
      token: this.token,
      citizenID: this.decoded._id,
    };
    this._NotesService.addMyNote(data).subscribe((response) => {
      if (response.message == 'success') {
        $('#addNote').modal('hide');
        this.getAllMyNotes();
        // this.isLoading = true;
        this.addedNote.reset();
        console.log(response);
      }
    });
  }

  getNoteId(id: any) {
    this.noteId = id;
  }

  deleteNote() {
    let data = {
      NoteID: this.noteId,
      token: this.token,
    };
    this._NotesService.deleteMyNote(data).subscribe((response) => {
      if (response.message == 'deleted') {
        $('#deleteNote').modal('hide');
        this.getAllMyNotes();
        console.log(response);
      }
    });
  }

  editedNote = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });

  setValue() {
    for (let index = 0; index < this.AllNotes.length; index++) {
      if (this.AllNotes[index]._id == this.noteId) {
        this.editedNote.controls.title.setValue(this.AllNotes[index].title);
        this.editedNote.controls.desc.setValue(this.AllNotes[index].desc);
      }
    }
  }

  editNote(){
    let data = {
      title: this.editedNote.value.title,
      desc: this.editedNote.value.desc,
      NoteID: this.noteId,
      token: this.token
    };
    this._NotesService.editMyNote(data).subscribe(response => {
      if(response.message == 'updated'){
        $('#editNote').modal('hide');
        this.getAllMyNotes();
      }
      console.log(response.message);
    });
  }
}
