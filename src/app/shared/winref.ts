import { Injectable } from '@angular/core';

function _window(): any {
   // return the global native browser window object
   return window;
}

@Injectable({
    providedIn: 'root'
})
export class WindowRef {
   public paymentId: any
   constructor() {
      _window().vanillaToAngularCallback = (data) => {
        // communicate with other Angular providers
        this.paymentId = data;
        console.log(data);
      }
    }
   get nativeWindow(): any {
      return _window();
   }

}
