import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppuntamentoService } from '../../service/appuntamento.service';
import { Appuntamento } from '../../interfaces/appuntamento';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  prenotazioneForm: FormGroup;
  appuntamenti: Appuntamento[] = [];

  constructor(
    private fb: FormBuilder,
    private appuntamentoService: AppuntamentoService,
    private authService: AuthService
  ) {
    this.prenotazioneForm = this.fb.group({
      data: ['', Validators.required],
      oraInizio: ['', Validators.required],
      oraFine: ['', Validators.required],
      sala: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAppuntamenti();
  }

  loadAppuntamenti() {
    const utenteId = this.authService.getUtenteId();
    if (utenteId) {
      this.appuntamentoService.getAppuntamentiByUtenteId(utenteId).subscribe(
        appuntamenti => {
          this.appuntamenti = appuntamenti;
        },
        error => {
          console.error('Errore nel caricamento degli appuntamenti', error);
        }
      );
    } else {
      console.error('ID utente non disponibile');
    }
  }

  onSubmit() {
    if (this.prenotazioneForm.valid) {
      const utenteId = this.authService.getUtenteId();
  
      if (utenteId !== null) {
        const newAppuntamento: Appuntamento = {
          id: 0,
          data: this.prenotazioneForm.value.data,
          oraInizio: this.prenotazioneForm.value.oraInizio,
          oraFine: this.prenotazioneForm.value.oraFine,
          sala: this.prenotazioneForm.value.sala,
          utenteId: utenteId  // Assicurati che utenteId non sia null
        };
  
        this.appuntamentoService.createAppuntamento(newAppuntamento).subscribe(
          response => {
            console.log('Appuntamento creato con successo', response);
            alert('Appuntamento creato con successo');
            this.prenotazioneForm.reset();
            this.loadAppuntamenti(); // Ricarica gli appuntamenti dopo la creazione
          },
          error => {
            console.error('Errore nella creazione dell\'appuntamento', error);
            alert('Errore nella creazione dell\'appuntamento');
          }
        );
      } else {
        console.error('ID utente non disponibile o form non valido');
        // Gestione dell'errore, ad esempio mostrare un messaggio all'utente
      }
    }
  }
  
}
