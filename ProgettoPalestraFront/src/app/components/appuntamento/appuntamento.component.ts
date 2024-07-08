import { Component, OnInit } from '@angular/core';
import { AppuntamentoService } from '../../service/appuntamento.service';
import { Appuntamento } from '../../interfaces/appuntamento';

@Component({
  selector: 'app-appuntamento',
  templateUrl: './appuntamento.component.html',
  styleUrls: ['./appuntamento.component.scss']
})
export class AppuntamentoComponent implements OnInit {
  appuntamenti: Appuntamento[] = [];

  constructor(private appuntamentoService: AppuntamentoService) {}

  ngOnInit(): void {
    this.appuntamentoService.getAppuntamenti().subscribe(
      data => {
        this.appuntamenti = data;
      },
      error => {
        console.error('Errore nel recupero degli appuntamenti', error);
      }
    );
  }

  eliminaAppuntamento(id: number, indice: number): void {
    this.appuntamentoService.deleteAppuntamento(id).subscribe(
      () => {
        this.appuntamenti.splice(indice, 1);
      },
      error => {
        console.error('Errore durante l\'eliminazione dell\'appuntamento', error);
      }
    );
  }
}
