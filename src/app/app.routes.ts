import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error';
import { TestErrorComponent } from './test-error/test-error';
import { NetworkErrorComponent } from './network-error/network-error';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Andy Grails 123',
  },
  {
    path: 'details/:id',
    component: VideoDetailsComponent,
    title: 'Home details',
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy - Andy Grails 123',
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Imprint/Terms - Andy Grails 123',
  },
  {
    path: '500',
    component: InternalServerErrorComponent,
    title: 'Internal Server Error - Andy Grails 123',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Page Not Found - Andy Grails 123',
  },
  {
    path: 'test/error',
    component: TestErrorComponent,
    title: 'Error Test - Andy Grails 123',
  },
  {
    path: 'network/error',
    component: NetworkErrorComponent,
    title: 'Network Error - Andy Grails 123',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found - Andy Grails 123',
  },
];

export default routeConfig;
