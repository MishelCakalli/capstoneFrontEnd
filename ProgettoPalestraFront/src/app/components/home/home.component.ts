// src/app/components/home/home.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppuntamentoService } from '../../service/appuntamento.service';
import { Appuntamento } from '../../interfaces/appuntamento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  prenotazioneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appuntamentoService: AppuntamentoService
  ) {
    this.prenotazioneForm = this.fb.group({
      data: ['', Validators.required],
      oraInizio: ['', Validators.required],
      oraFine: ['', Validators.required],
      sala: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.prenotazioneForm.valid) {
      const newAppuntamento: Appuntamento = {
        id: 0,
        data: this.prenotazioneForm.value.data,
        oraInizio: this.prenotazioneForm.value.oraInizio,
        oraFine: this.prenotazioneForm.value.oraFine,
        sala: this.prenotazioneForm.value.sala
      };

      this.appuntamentoService.createAppuntamento(newAppuntamento).subscribe(
        response => {
          console.log('Lezione creata con successo', response);
          alert('Lezione creata con successo');
          this.prenotazioneForm.reset();
        },
        error => {
          console.error('Errore nella creazione della lezione', error);
          alert('Errore nella creazione della lezione');
        }
      );
    }
  }
}
