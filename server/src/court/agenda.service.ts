import { Injectable, OnModuleInit } from '@nestjs/common';
import { Agenda } from 'agenda';

@Injectable()
export class AgendaService implements OnModuleInit {
  private agenda: Agenda;

  constructor() {
    this.agenda = new Agenda({
      db: { address: process.env.MONGO_URL, collection: 'checkOuts' },
      processEvery: '1 minute',
    });
  }

  onModuleInit() {
    this.agenda.start();
  }

  getAgenda(): Agenda {
    return this.agenda;
  }
}
