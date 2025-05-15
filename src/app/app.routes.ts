import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VideoDetailsComponent} from './video-details/video-details.component';

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
  ];

export default routeConfig;
