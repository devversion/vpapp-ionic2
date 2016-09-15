import {Injectable} from 'angular2/core';
import {SqlStorage, Storage, LocalStorage} from 'ionic-angular/index';
import {PromiseWrapper} from 'angular2/src/facade/promise';

@Injectable()
export class RepresentationCache {

  localStorage: Storage;
  sqlStorage: Storage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
    this.sqlStorage = new Storage(SqlStorage);
  }

  getTodayRepresentations(): Promise<string> {
    if (this.localStorage.get('VP_TODAY_REP')) {
      return this.localStorage.get('VP_TODAY_REP');
    }

    return this.sqlStorage.get('VP_TODAY_REP');
  }

  getTomorrowRepresentations(): Promise<string> {
    if (this.localStorage.get('VP_TOMORROW_REP')) {
      return this.localStorage.get('VP_TOMORROW_REP');
    }

    return this.sqlStorage.get('VP_TOMORROW_REP');
  }

  getTodayDate(): Promise<string> {
    if (this.localStorage.get('VP_TODAY_DATE')) {
      return this.localStorage.get('VP_TODAY_DATE');
    }

    return this.sqlStorage.get('VP_TOMORROW_REP');
  }

  getTomorrowDate(): Promise<string> {
    if (this.localStorage.get('VP_TOMORROW_DATE')) {
      return this.localStorage.get('VP_TOMORROW_DATE');
    }

    return this.sqlStorage.get('VP_TOMORROW_DATE');
  }

  setTodayRepresentations(todayRepresentation: string, todayDate: Date): void {
    if (!todayRepresentation) {
      this.localStorage.remove('VP_TODAY_REP');
      this.sqlStorage.remove('VP_TODAY_REP');
      return;
    }
    if (!todayDate) {
      this.localStorage.remove('VP_TODAY_DATE');
      this.sqlStorage.remove('VP_TODAY_DATE');
    }

    this.localStorage.set('VP_TODAY_REP', todayRepresentation);
    this.sqlStorage.set('VP_TODAY_REP', todayRepresentation);
    this.localStorage.set('VP_TODAY_DATE', todayDate);
    this.sqlStorage.set('VP_TODAY_DATE', todayDate);
  }

  setTomorrowRepresentations(tomorrowRepresentation: string, tomorrowDate: Date): void {
    if (!tomorrowRepresentation) {
      this.localStorage.remove('VP_TOMORROW_REP');
      this.sqlStorage.remove('VP_TOMORROW_REP');
      return;
    }
    if (!tomorrowDate) {
      this.localStorage.remove('VP_TODAY_DATE');
      this.sqlStorage.remove('VP_TODAY_DATE');
    }

    this.localStorage.set('VP_TOMORROW_REP', tomorrowRepresentation);
    this.sqlStorage.set('VP_TOMORROW_REP', tomorrowRepresentation);
    this.localStorage.set('VP_TOMORROW_DATE', tomorrowDate);
    this.sqlStorage.set('VP_TOMORROW_DATE', tomorrowDate);
  }
}