import 'zone.js';
import 'reflect-metadata';
import {bootstrap, Component} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html'
})

class AppComponent {
    
    pageLabel = "Angular2 Demo";
    buttonLabel = "Test it";

    constructor() {
        this.pageLabel = "but what?";
    }

    testIt = () => {
        alert("hello");
    };
}

// Starts up the Angular2 application
bootstrap(AppComponent);