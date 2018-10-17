import { Component, ViewChild } from '@angular/core';
import { AppJsonService, LoaderService, MessageService } from './services/index.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loader') loadingOverlay;
  
  constructor(
    private loaderService: LoaderService,
    private appJsonService: AppJsonService,
    private messageService: MessageService,

) {
    appJsonService.load().subscribe((results) => {
        this.loaderService.isLoading().subscribe(isLoaded => {
            if (isLoaded) {
                this.loadingOverlay.show();
            } else {
                this.loadingOverlay.hide();
            }
        });

        // this.messageService.hasMessage().subscribe(hasMessage => {
        //     console.log(hasMessage);
        // });
    });
}
}
