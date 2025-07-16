import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error';
import { TestErrorComponent } from './test-error/test-error';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Andy Grails',
  },
  {
    path: 'details/:id',
    component: VideoDetailsComponent,
    title: 'Home details',
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy - Andy Grails',
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Imprint/Terms - Andy Grails',
  },
  {
    path: '500',
    component: InternalServerErrorComponent,
    title: 'Internal Server Error - Andy Grails',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Page Not Found - Andy Grails',
  },
  {
    path: 'test/error',
    component: TestErrorComponent,
    title: 'Error Test - Andy Grails',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found - Andy Grails',
  },
];

export default routeConfig;
