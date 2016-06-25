import {Page, Modal, NavController, Platform, Alert} from 'ionic-angular';  
import {BirthdayService} from '../services/birthday.service';
import {NgZone} from '@angular/core';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  providers: [BirthdayService]
})

export class Page3 {
	public birthdays = [];
  public allTimes;

  constructor (
  	private birthdayService: BirthdayService,
		private platform: Platform,
		private zone: NgZone,
    public nav: NavController) {
  }

  onPageLoaded() {
    this.platform.ready().then(() => {
        this.birthdayService.initDB();

        this.birthdayService.getAll()
            .then(data => {
                this.zone.run(() => {
                   this.birthdays = data;

                   var total = 0;
                   for(var i = 0; i < data.length; i++) {
                     if(typeof data[i].Time == 'string') {
                       total += parseInt(data[i].Time)
                     } 
                   }

                   this.allTimes = total;


                });
            })
            .catch(console.error.bind(console));
    });
  }

  itemSelected(doc){
    let indexDb = this.birthdayService;

    let confirm = Alert.create({
      title: 'Deletar',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Aceitar', indexDb);
            
            indexDb.delete(doc).then(data => {
              console.log(data);
            })
            .catch(console.error.bind(console));;

          }
        }
      ]
    });
    this.nav.present(confirm);
  }
}
