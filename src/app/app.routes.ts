import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';

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
];

export default routeConfig;
