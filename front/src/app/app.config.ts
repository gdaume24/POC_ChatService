import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { RxStompService } from './rx-stomp.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },]
};
