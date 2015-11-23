import 'zone.js';
import 'reflect-metadata';
import {bootstrap, Component} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html'
})

class AppComponent {
    
    public pageLabel = "Angular2 Demo";

    constructor() {
        
    }
}

// Starts up the Angular2 application
bootstrap(AppComponent);