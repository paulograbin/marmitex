import {Injectable} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";


@Injectable()
export class LogUpdateComponent {

  constructor(private updates: SwUpdate) {
    console.log('started!!!!!')
    console.log('started!!!!!')
    console.log('started!!!!!')
    console.log('started!!!!!')

    console.log('enabled?', updates.isEnabled);

    updates.available.subscribe(event => this.promp());

    updates.versionUpdates
      .subscribe(event => {
        switch (event.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${event.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${event.currentVersion.hash}`);
            console.log(`New app version ready for use: ${event.latestVersion.hash}`);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${event.version.hash}': ${event.error}`);
            break;
        }
      });
  }

  promp() {
    console.log('updating');
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
